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
var auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
var stripe_1 = __importDefault(require("stripe"));
var cart_model_1 = __importDefault(require("../models/cart.model"));
var orderItem_model_1 = __importDefault(require("../models/orderItem.model"));
var post_model_1 = __importDefault(require("../models/post.model"));
var CartNotFoundException_1 = __importDefault(require("../exceptions/CartNotFoundException"));
var discount_1 = __importDefault(require("../utils/discount"));
var PayController = /** @class */ (function () {
    function PayController() {
        var _this = this;
        this.path = '/pay';
        this.router = express_1.default.Router();
        this.cart = cart_model_1.default;
        this.orderItem = orderItem_model_1.default;
        this.product = post_model_1.default;
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2020-03-02',
            typescript: true,
        });
        this.createCheckoutSession = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var cart, cartProducts, productIds, products, lineItems, session, message, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
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
                                .sort({ createdAt: -1 })];
                    case 2:
                        products = _a.sent();
                        products = products.map(function (product) {
                            var author = product.author;
                            if (req.user.subscriptions.includes(author._id)) {
                                product.price *= discount_1.default;
                            }
                            return product;
                        });
                        lineItems = products.map(function (product) { return ({
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: product.title,
                                    images: [product.image],
                                },
                                unit_amount: product.price * 100,
                            },
                            quantity: 1,
                        }); });
                        return [4 /*yield*/, this.stripe.checkout.sessions.create({
                                payment_method_types: ['card'],
                                line_items: lineItems,
                                mode: 'payment',
                                success_url: process.env.BASE_URL_CLIENT + "/pay/success",
                                cancel_url: process.env.BASE_URL_CLIENT + "/pay/cancel",
                            })];
                    case 3:
                        session = _a.sent();
                        message = 'Stripe session created successfully';
                        res.status(201).json({ message: message, session: session });
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        next(err_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.initializeRoutes();
    }
    PayController.prototype.initializeRoutes = function () {
        this.router
            .all(this.path + "*", auth_middleware_1.default)
            .post(this.path + "/create-checkout-session", this.createCheckoutSession);
    };
    return PayController;
}());
exports.default = PayController;
//# sourceMappingURL=pay.controller.js.map