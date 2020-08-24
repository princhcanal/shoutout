"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var wishlistValidator = {
    addToWishlist: [
        express_validator_1.body('product')
            .trim()
            .not()
            .isEmpty()
            .withMessage('ProductId cannot be empty'),
    ],
};
exports.default = wishlistValidator;
//# sourceMappingURL=wishlist.validator.js.map