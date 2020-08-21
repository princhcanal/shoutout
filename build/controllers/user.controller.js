"use strict";
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
var user_model_1 = __importDefault(require("../models/user.model"));
var post_model_1 = __importDefault(require("../models/post.model"));
var auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
var UserNotFoundException_1 = __importDefault(require("../exceptions/UserNotFoundException"));
// TODO: implement subscription service for each user for discounts on products
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.path = '/user';
        this.router = express_1.default.Router();
        this.user = user_model_1.default;
        this.post = post_model_1.default;
        this.getUserProfile = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var username, user, posts, message, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        username = req.params.username;
                        return [4 /*yield*/, this.user.findOne({ username: username })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new UserNotFoundException_1.default(username);
                        }
                        return [4 /*yield*/, this.post.find({ author: user._id })];
                    case 2:
                        posts = _a.sent();
                        message = "User " + username + " fetched successfully";
                        user.password = '';
                        res.status(200).json({ message: message, user: user, posts: posts });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        next(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.followUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var username, followingUser, user, message, numFollowers, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        username = req.params.username;
                        return [4 /*yield*/, this.user.findOne({ username: username })];
                    case 1:
                        followingUser = _a.sent();
                        return [4 /*yield*/, this.user.findById(req.user._id)];
                    case 2:
                        user = _a.sent();
                        message = "User " + username + " followed successfully";
                        if (!followingUser || !user) {
                            throw new UserNotFoundException_1.default(username);
                        }
                        if (!followingUser.followers.includes(user._id)) {
                            followingUser.followers.push(user._id);
                        }
                        else {
                            message = "User " + username + " already followed";
                            return [2 /*return*/, res.status(200).json({ message: message })];
                        }
                        if (!!user.following.includes(followingUser._id)) return [3 /*break*/, 4];
                        user.following.push(followingUser._id);
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, followingUser.save()];
                    case 5:
                        followingUser = _a.sent();
                        return [4 /*yield*/, followingUser
                                .populate('followers', 'username')
                                .execPopulate()];
                    case 6:
                        _a.sent();
                        numFollowers = followingUser.followers.length;
                        res.status(200).json({ message: message, numFollowers: numFollowers });
                        return [3 /*break*/, 8];
                    case 7:
                        err_2 = _a.sent();
                        next(err_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.subscribeUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var username, subscribingUser, user, message, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        username = req.params.username;
                        return [4 /*yield*/, this.user.findOne({ username: username })];
                    case 1:
                        subscribingUser = _a.sent();
                        return [4 /*yield*/, this.user.findById(req.user._id)];
                    case 2:
                        user = _a.sent();
                        message = "User " + username + " subscribed successfully";
                        if (!subscribingUser || !user) {
                            throw new UserNotFoundException_1.default(username);
                        }
                        if (!subscribingUser.subscribers.includes(user._id)) {
                            subscribingUser.subscribers.push(user._id);
                        }
                        else {
                            message = "User " + username + " already subscribed";
                            return [2 /*return*/, res.status(200).json({ message: message })];
                        }
                        if (!!user.subscriptions.includes(subscribingUser._id)) return [3 /*break*/, 4];
                        user.subscriptions.push(subscribingUser._id);
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, subscribingUser.save()];
                    case 5:
                        subscribingUser = _a.sent();
                        return [4 /*yield*/, subscribingUser
                                .populate('subscribers', 'username')
                                .execPopulate()];
                    case 6:
                        _a.sent();
                        res.status(200).json({ message: message });
                        return [3 /*break*/, 8];
                    case 7:
                        err_3 = _a.sent();
                        next(err_3);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.getUserPosts = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var username, user, posts, message, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        username = req.params.username;
                        return [4 /*yield*/, this.user.findOne({ username: username })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new UserNotFoundException_1.default(username);
                        }
                        return [4 /*yield*/, this.post.find({ author: user._id })];
                    case 2:
                        posts = _a.sent();
                        message = 'Posts fetched successfully';
                        res.status(200).json({ message: message, posts: posts });
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        next(err_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userData, user, message, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userData = req.body;
                        return [4 /*yield*/, this.user.findByIdAndUpdate(req.user._id, userData, { new: true })];
                    case 1:
                        user = _a.sent();
                        message = 'User updated successfully';
                        res.status(200).json({ message: message, user: user });
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        next(err_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getFollowing = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var username, user, followingUsers, following, message, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        username = req.params.username;
                        return [4 /*yield*/, this.user.findOne({ username: username })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new UserNotFoundException_1.default(username);
                        }
                        return [4 /*yield*/, this.user
                                .find({
                                followers: user._id,
                            })
                                .select('username')];
                    case 2:
                        followingUsers = _a.sent();
                        following = followingUsers.map(function (f) {
                            return {
                                _id: f._id,
                                username: f.username,
                                url: process.env.BASE_URL + "/user/" + f.username,
                            };
                        });
                        message = 'Following fetched successfully';
                        res.status(200).json({
                            message: message,
                            following: following,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _a.sent();
                        next(err_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.initializeRoutes();
    }
    UserController.prototype.initializeRoutes = function () {
        this.router.get(this.path + "/:username", this.getUserProfile);
        this.router.get(this.path + "/:username/following", this.getFollowing);
        this.router.get(this.path + "/:username/posts", this.getUserPosts);
        this.router
            .all(this.path + "*", auth_middleware_1.default)
            .patch("" + this.path, this.updateUser)
            .post(this.path + "/:username/follow", this.followUser)
            .post(this.path + "/:username/subscribe", this.subscribeUser);
    };
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map