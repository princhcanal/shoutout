"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var postValidator = {
    createPost: [
        express_validator_1.body('author')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Author cannot be empty'),
        express_validator_1.body('content')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Content cannot be empty'),
        express_validator_1.body('title')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Title cannot be empty'),
    ],
    updatePost: [
        express_validator_1.body('author').trim().optional().withMessage('Author cannot be empty'),
        express_validator_1.body('content')
            .trim()
            .optional()
            .withMessage('Content cannot be empty'),
        express_validator_1.body('title').trim().optional().withMessage('Title cannot be empty'),
    ],
};
exports.default = postValidator;
//# sourceMappingURL=post.validator.js.map