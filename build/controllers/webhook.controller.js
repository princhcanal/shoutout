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
var stripe_1 = __importDefault(require("stripe"));
var user_model_1 = __importDefault(require("../models/user.model"));
var WebhookController = /** @class */ (function () {
    function WebhookController() {
        var _this = this;
        this.path = '/stripe-webhook';
        this.router = express_1.default.Router();
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2020-03-02',
            typescript: true,
        });
        this.user = user_model_1.default;
        this.listenStripeWebhook = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var event, _a, paymentIntent, paymentMethod;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        try {
                            event = JSON.parse(req.body);
                        }
                        catch (err) {
                            res.status(400).send("Webhook Error: " + err.message);
                        }
                        _a = event.type;
                        switch (_a) {
                            case 'checkout.session.completed': return [3 /*break*/, 1];
                            case 'payment_intent.succeeded': return [3 /*break*/, 3];
                            case 'payment_method.attached': return [3 /*break*/, 4];
                            case 'payment_intent.created': return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 6];
                    case 1:
                        console.log('SUBSCRIBED!!!!!!!');
                        return [4 /*yield*/, this.user.findByIdAndUpdate(req.user._id, {
                                subscription: 'Premium',
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        paymentIntent = event.data.object;
                        // Then define and call a method to handle the successful payment intent.
                        // handlePaymentIntentSucceeded(paymentIntent);
                        return [3 /*break*/, 7];
                    case 4:
                        paymentMethod = event.data.object;
                        // Then define and call a method to handle the successful attachment of a PaymentMethod.
                        // handlePaymentMethodAttached(paymentMethod);
                        return [3 /*break*/, 7];
                    case 5:
                        console.log('it works');
                        return [3 /*break*/, 7];
                    case 6:
                        console.log("Unhandled event type " + event.type);
                        _b.label = 7;
                    case 7:
                        // Return a res to acknowledge receipt of the event
                        res.json({ received: true });
                        return [2 /*return*/];
                }
            });
        }); };
        this.initializeRoutes();
    }
    WebhookController.prototype.initializeRoutes = function () {
        this.router.post("" + this.path, this.listenStripeWebhook);
    };
    return WebhookController;
}());
exports.default = WebhookController;
//# sourceMappingURL=webhook.controller.js.map