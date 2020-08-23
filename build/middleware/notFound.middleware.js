"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var notFoundMiddleware = function (req, res, next) {
    var message = 'Not found';
    res.status(404).json({ message: message });
};
exports.default = notFoundMiddleware;
//# sourceMappingURL=notFound.middleware.js.map