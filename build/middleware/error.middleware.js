"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorMiddleware = function (error, req, res, next) {
    var status = error.status || 500;
    var message = error.message || 'Something went wrong';
    var data = error.data;
    res.status(status).json({ status: status, message: message, data: data });
};
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map