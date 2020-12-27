"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = void 0;
var envalid_1 = require("envalid");
exports.validateEnv = function () {
    envalid_1.cleanEnv(process.env, {
        MONGO_PASSWORD: envalid_1.str(),
        MONGO_USER: envalid_1.str(),
        MONGO_DB_NAME: envalid_1.str(),
        MONGO_URI: envalid_1.str(),
        PORT: envalid_1.port(),
        JWT_SECRET: envalid_1.str(),
        BASE_URL: envalid_1.str(),
        BASE_URL_CLIENT: envalid_1.str(),
        STRIPE_SECRET_KEY: envalid_1.str(),
        STRIPE_PUBLISHABLE_KEY: envalid_1.str(),
        STRIPE_WEBHOOK_SECRET: envalid_1.str(),
    });
};
//# sourceMappingURL=validateEnv.js.map