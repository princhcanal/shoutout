"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
var user_model_1 = __importDefault(require("../models/user.model"));
var auth_validator_1 = __importDefault(require("../validators/auth.validator"));
var EmailAlreadyExistsException_1 = __importDefault(require("../exceptions/EmailAlreadyExistsException"));
var WrongCredentialsException_1 = __importDefault(require("../exceptions/WrongCredentialsException"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var cart_model_1 = __importDefault(require("../models/cart.model"));
var wishlist_model_1 = __importDefault(require("../models/wishlist.model"));
var AuthController = /** @class */ (function () {
    function AuthController() {
        var _this = this;
        this.path = '/auth';
        this.router = express_1.default.Router();
        this.user = user_model_1.default;
        this.cart = cart_model_1.default;
        this.wishlist = wishlist_model_1.default;
        this.register = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userData, existingUser, hashedPassword, user, cart, wishlist, token, message, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        userData = req.body;
                        return [4 /*yield*/, this.user.findOne({
                                email: userData.email,
                            })];
                    case 1:
                        existingUser = _a.sent();
                        if (existingUser) {
                            throw new EmailAlreadyExistsException_1.default(userData.email);
                        }
                        return [4 /*yield*/, bcryptjs_1.default.hash(userData.password, 10)];
                    case 2:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.user.create(__assign(__assign({}, userData), { password: hashedPassword, url: process.env.BASE_URL + "/user/" + userData.username }))];
                    case 3:
                        user = _a.sent();
                        cart = new this.cart({
                            user: user._id,
                        });
                        wishlist = new this.wishlist({
                            user: user._id,
                        });
                        return [4 /*yield*/, cart.save()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, wishlist.save()];
                    case 5:
                        _a.sent();
                        token = this.createToken(user);
                        message = 'User registered successfully';
                        res.setHeader('Set-Cookie', [this.createCookie(token)]);
                        res.status(201).json({ message: message, token: token });
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        next(err_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.login = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var loginData, user, isPasswordMatch, token, message, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loginData = req.body;
                        return [4 /*yield*/, this.user.findOne({ email: loginData.email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new WrongCredentialsException_1.default();
                        }
                        return [4 /*yield*/, bcryptjs_1.default.compare(loginData.password, user.password)];
                    case 2:
                        isPasswordMatch = _a.sent();
                        if (!isPasswordMatch) {
                            throw new WrongCredentialsException_1.default();
                        }
                        token = this.createToken(user);
                        message = 'User logged in successfully';
                        res.setHeader('Set-Cookie', [this.createCookie(token)]);
                        res.status(200).json({ message: message, token: token });
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        next(err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.logout = function (req, res, next) {
            var message = 'User logged out successfully';
            res.setHeader('Set-Cookie', ['Authorization=; HttpOnly; Max-Age=0']);
            res.status(200).json({ message: message });
        };
        this.initializeRoutes();
    }
    AuthController.prototype.initializeRoutes = function () {
        this.router.post(this.path + "/register", validation_middleware_1.default(auth_validator_1.default.register), this.register);
        this.router.post(this.path + "/login", validation_middleware_1.default(auth_validator_1.default.login), this.login);
        this.router.post(this.path + "/logout", this.logout);
    };
    AuthController.prototype.createToken = function (user) {
        var expiresIn = 60 * 60; // an hour
        var secret = process.env.JWT_SECRET;
        var tokenData = { _id: user._id };
        return {
            expiresIn: expiresIn,
            token: jsonwebtoken_1.default.sign(tokenData, secret, { expiresIn: expiresIn }),
        };
    };
    AuthController.prototype.createCookie = function (token) {
        return "Authorization=" + token.token + "; HttpOnly; Max-Age=" + token.expiresIn;
    };
    return AuthController;
}());
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map