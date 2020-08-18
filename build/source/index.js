"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
require("dotenv/config");
var validateEnv_1 = require("./utils/validateEnv");
var post_controller_1 = __importDefault(require("./controllers/post.controller"));
validateEnv_1.validateEnv();
var port = parseInt(process.env.PORT) || 5000;
var app = new app_1.default([new post_controller_1.default()], port);
app.listen();
//# sourceMappingURL=index.js.map