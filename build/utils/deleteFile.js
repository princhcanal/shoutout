"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var deleteFile = function (filePath) {
    filePath = path_1.default.join(filePath);
    fs_1.default.unlink(filePath, function (err) {
        console.error('clearImageError:', err);
    });
};
exports.default = deleteFile;
//# sourceMappingURL=deleteFile.js.map