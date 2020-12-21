"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// FIXME: change password error on chrome
var app_1 = __importDefault(require("./app"));
require("dotenv/config");
var validateEnv_1 = require("./utils/validateEnv");
var post_controller_1 = __importDefault(require("./controllers/post.controller"));
var auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
var user_controller_1 = __importDefault(require("./controllers/user.controller"));
var feed_controller_1 = __importDefault(require("./controllers/feed.controller"));
var pay_controller_1 = __importDefault(require("./controllers/pay.controller"));
var cart_controller_1 = __importDefault(require("./controllers/cart.controller"));
var wishlist_controller_1 = __importDefault(require("./controllers/wishlist.controller"));
validateEnv_1.validateEnv();
var port = parseInt(process.env.PORT) || 5000;
var app = new app_1.default([
    new post_controller_1.default(),
    new auth_controller_1.default(),
    new user_controller_1.default(),
    new feed_controller_1.default(),
    new pay_controller_1.default(),
    new cart_controller_1.default(),
    new wishlist_controller_1.default(),
], port);
app.listen();
//# sourceMappingURL=index.js.map