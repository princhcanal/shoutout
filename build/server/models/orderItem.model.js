"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var orderItemSchema = new mongoose_1.default.Schema({
    cart: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true,
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    quantity: { type: Number, required: true },
}, { timestamps: true });
var orderItemModel = mongoose_1.default.model('Order Item', orderItemSchema);
exports.default = orderItemModel;
//# sourceMappingURL=orderItem.model.js.map