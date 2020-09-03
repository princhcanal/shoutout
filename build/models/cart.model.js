"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var cartSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    products: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Order Item' }],
    totalPrice: { type: Number, required: true, default: 0 },
}, { timestamps: true });
var cartModel = mongoose_1.default.model('Cart', cartSchema);
exports.default = cartModel;
//# sourceMappingURL=cart.model.js.map