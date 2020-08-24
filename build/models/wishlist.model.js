"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var wishlistSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Post' }],
}, { timestamps: true });
var wishListModel = mongoose_1.default.model('Wishlist', wishlistSchema);
exports.default = wishListModel;
//# sourceMappingURL=wishlist.model.js.map