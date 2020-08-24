"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var cartValidator = {
    addToCart: [
        express_validator_1.body('product')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Product cannot be empty'),
        express_validator_1.body('quantity')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Quantity cannot be empty')
            .isNumeric()
            .withMessage('Quantity must be a number'),
    ],
};
exports.default = cartValidator;
//# sourceMappingURL=cart.validator.js.map