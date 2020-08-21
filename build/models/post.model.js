"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var postSchema = new mongoose_1.default.Schema({
<<<<<<< HEAD
    author: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
});
=======
    author: {
        ref: 'User',
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    content: String,
    title: String,
}, { timestamps: true });
>>>>>>> bf1f815119131e99e1c1df2af1b6ca14ef5e4d9a
var postModel = mongoose_1.default.model('Post', postSchema);
exports.default = postModel;
//# sourceMappingURL=post.model.js.map