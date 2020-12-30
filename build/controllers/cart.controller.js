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
var auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
var validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
var cart_validator_1 = __importDefault(require("../validators/cart.validator"));
var cart_model_1 = __importDefault(require("../models/cart.model"));
var orderItem_model_1 = __importDefault(require("../models/orderItem.model"));
var post_model_1 = __importDefault(require("../models/post.model"));
var CartNotFoundException_1 = __importDefault(require("../exceptions/CartNotFoundException"));
var OrderItemNotFound_1 = __importDefault(require("../exceptions/OrderItemNotFound"));
var discount_1 = __importDefault(require("../utils/discount"));
var CartController = /** @class */ (function () {
    function CartController() {
        var _this = this;
        this.path = '/cart';
        this.router = express_1.default.Router();
        this.cart = cart_model_1.default;
        this.orderItem = orderItem_model_1.default;
        this.product = post_model_1.default;
        this.getCart = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var cart, cartProducts, productIds, products, message, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.cart
                                .findOne({ user: req.user._id })
                                .populate('products')];
                    case 1:
                        cart = _a.sent();
                        if (!cart) {
                            throw new CartNotFoundException_1.default(req.user.username);
                        }
                        cartProducts = cart.products;
                        productIds = cartProducts.map(function (product) { return product.product; });
                        return [4 /*yield*/, this.product
                                .find({
                                _id: { $in: productIds },
                            })
                                .sort({ createdAt: -1 })
                                .populate('author')];
                    case 2:
                        products = _a.sent();
                        products = products.map(function (product) {
                            var author = product.author;
                            if (req.user.subscription === 'Premium') {
                                product.price *= 0.25;
                            }
                            if (req.user.subscriptions.includes(author._id)) {
                                product.price *= discount_1.default;
                            }
                            return product;
                        });
                        message = 'Cart fetched successfully';
                        res.status(200).json({ message: message, cart: cart, products: products });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        next(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.addToCart = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var cart, orderItemData, createdOrder, order, product, message, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.cart.findOne({ user: req.user._id })];
                    case 1:
                        cart = _a.sent();
                        if (!cart) {
                            throw new CartNotFoundException_1.default(req.user.username);
                        }
                        orderItemData = req.body;
                        createdOrder = new this.orderItem(__assign(__assign({}, orderItemData), { cart: cart._id }));
                        return [4 /*yield*/, createdOrder.save()];
                    case 2:
                        order = _a.sent();
                        return [4 /*yield*/, order.populate('product').execPopulate()];
                    case 3:
                        order = _a.sent();
                        product = order.product;
                        cart.products.push(order._id);
                        cart.totalPrice += product.price * order.quantity;
                        return [4 /*yield*/, cart.save()];
                    case 4:
                        _a.sent();
                        message = 'Item added to cart successfully';
                        res.status(201).json({ message: message, order: order, cart: cart });
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        next(err_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.clearCart = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var cart, message, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.cart.findOneAndUpdate({ user: req.user._id }, { products: [], totalPrice: 0 })];
                    case 1:
                        cart = _a.sent();
                        if (!cart) {
                            throw new CartNotFoundException_1.default(req.user.username);
                        }
                        return [4 /*yield*/, this.orderItem.deleteMany({ cart: cart._id })];
                    case 2:
                        _a.sent();
                        message = 'Cart items deleted successfully';
                        res.status(200).json({ message: message, cart: cart });
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        next(err_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.removeOrderItem = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var prodId, cart, orderItem, cartProducts, orderItemProduct, message, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        prodId = req.params.id;
                        return [4 /*yield*/, this.cart.findOne({ user: req.user._id })];
                    case 1:
                        cart = _a.sent();
                        return [4 /*yield*/, this.orderItem
                                .findOne({ product: prodId })
                                .populate('product')];
                    case 2:
                        orderItem = _a.sent();
                        if (!cart) {
                            throw new CartNotFoundException_1.default(req.user.username);
                        }
                        cartProducts = cart.products;
                        if (!orderItem || !cartProducts.includes(orderItem._id)) {
                            throw new OrderItemNotFound_1.default(orderItem === null || orderItem === void 0 ? void 0 : orderItem._id);
                        }
                        orderItemProduct = orderItem.product;
                        cart.products.splice(cartProducts.indexOf(orderItem._id), 1);
                        cart.totalPrice -= orderItem.quantity * orderItemProduct.price;
                        return [4 /*yield*/, cart.save()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.orderItem.findByIdAndDelete(orderItem._id)];
                    case 4:
                        _a.sent();
                        message = "Order item " + orderItem._id + " deleted from cart successfully";
                        res.status(200).json({ message: message, orderItem: orderItem });
                        return [3 /*break*/, 6];
                    case 5:
                        err_4 = _a.sent();
                        next(err_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.initializeRoutes();
    }
    CartController.prototype.initializeRoutes = function () {
        this.router
            .all(this.path + "*", auth_middleware_1.default)
            .get("" + this.path, this.getCart)
            .delete("" + this.path, this.clearCart)
            .post("" + this.path, validation_middleware_1.default(cart_validator_1.default.addToCart), this.addToCart)
            .delete(this.path + "/:id", this.removeOrderItem);
    };
    return CartController;
}());
exports.default = CartController;
//# sourceMappingURL=cart.controller.js.map