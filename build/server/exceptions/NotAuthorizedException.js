"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var HttpException_1 = __importDefault(require("./HttpException"));
var NotAuthorizedException = /** @class */ (function (_super) {
    __extends(NotAuthorizedException, _super);
    function NotAuthorizedException() {
        return _super.call(this, 401, "Not authorized") || this;
    }
    return NotAuthorizedException;
}(HttpException_1.default));
exports.default = NotAuthorizedException;
//# sourceMappingURL=NotAuthorizedException.js.map