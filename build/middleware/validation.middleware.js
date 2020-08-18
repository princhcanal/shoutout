"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var HttpException_1 = __importDefault(require("../exceptions/HttpException"));
var compose_middleware_1 = require("compose-middleware");
var validationResultMiddleware = function (req, res, next) {
    try {
        var errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            var error = new HttpException_1.default(422, 'Post creation failed', {
                errors: errors.array(),
            });
            throw error;
        }
        next();
    }
    catch (err) {
        next(err);
    }
};
var validationMiddleware = function (validations) {
    return compose_middleware_1.compose([validations, validationResultMiddleware]);
};
exports.default = validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map