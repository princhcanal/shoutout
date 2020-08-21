"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    followers: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, { timestamps: true });
var userModel = mongoose_1.default.model('User', userSchema);
exports.default = userModel;
//# sourceMappingURL=user.model.js.map