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
var wishlist_model_1 = __importDefault(require("../models/wishlist.model"));
var post_model_1 = __importDefault(require("../models/post.model"));
var auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
var validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
var wishlist_validator_1 = __importDefault(require("../validators/wishlist.validator"));
var WishlistNotFoundException_1 = __importDefault(require("../exceptions/WishlistNotFoundException"));
var WishlistItemNotFoundException_1 = __importDefault(require("../exceptions/WishlistItemNotFoundException"));
var WishlistController = /** @class */ (function () {
    function WishlistController() {
        var _this = this;
        this.path = '/wishlist';
        this.router = express_1.default.Router();
        this.wishlist = wishlist_model_1.default;
        this.products = post_model_1.default;
        this.getWishlist = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var wishlist, products, message, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.wishlist
                                .findOne({
                                user: req.user._id,
                            })
                                .populate('products')];
                    case 1:
                        wishlist = _a.sent();
                        if (!wishlist) {
                            throw new WishlistNotFoundException_1.default(req.user.username);
                        }
                        return [4 /*yield*/, this.products
                                .find({ _id: { $in: wishlist.products } })
                                .populate('author', 'username')];
                    case 2:
                        products = _a.sent();
                        wishlist.products = products;
                        message = 'Wishlist fetched successfully';
                        res.status(200).json({ message: message, wishlist: wishlist });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        next(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.addToWishlist = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var wishlist, prodId, message, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.wishlist.findOne({
                                user: req.user._id,
                            })];
                    case 1:
                        wishlist = _a.sent();
                        prodId = req.body.product;
                        if (!wishlist) {
                            throw new WishlistNotFoundException_1.default(req.user.username);
                        }
                        message = "Product " + prodId + " already in wishlist";
                        if (wishlist.products.includes(prodId)) {
                            return [2 /*return*/, res.status(200).json({ message: message, wishlist: wishlist })];
                        }
                        wishlist.products.push(prodId);
                        return [4 /*yield*/, wishlist.save()];
                    case 2:
                        _a.sent();
                        message = 'Product added to wishlist successfully';
                        res.status(201).json({ message: message, wishlist: wishlist });
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        next(err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.removeFromWishlist = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var wishlist, prodId, wishlistProducts, message, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.wishlist.findOne({
                                user: req.user._id,
                            })];
                    case 1:
                        wishlist = _a.sent();
                        prodId = req.params.id;
                        if (!wishlist) {
                            throw new WishlistNotFoundException_1.default(req.user.username);
                        }
                        wishlistProducts = wishlist.products;
                        if (!wishlistProducts.includes(prodId)) {
                            throw new WishlistItemNotFoundException_1.default(prodId);
                        }
                        wishlist.products.splice(wishlistProducts.indexOf(prodId), 1);
                        return [4 /*yield*/, wishlist.save()];
                    case 2:
                        _a.sent();
                        message = "Product " + prodId + " removed from wishlist successfully";
                        res.status(200).json({ message: message, wishlist: wishlist });
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        next(err_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.initializeRoutes();
    }
    WishlistController.prototype.initializeRoutes = function () {
        this.router
            .all(this.path + "*", auth_middleware_1.default)
            .get("" + this.path, this.getWishlist)
            .post("" + this.path, validation_middleware_1.default(wishlist_validator_1.default.addToWishlist), this.addToWishlist)
            .delete(this.path + "/:id", this.removeFromWishlist);
    };
    return WishlistController;
}());
exports.default = WishlistController;
//# sourceMappingURL=wishlist.controller.js.map