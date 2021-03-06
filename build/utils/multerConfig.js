"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var uuid_1 = require("uuid");
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var dest = 'images';
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        cb(null, uuid_1.v4() + "-" + file.originalname);
    },
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
var multerConfig = multer_1.default({ storage: storage, fileFilter: fileFilter });
exports.default = multerConfig;
//# sourceMappingURL=multerConfig.js.map