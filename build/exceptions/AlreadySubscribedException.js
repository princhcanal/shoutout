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
var AlreadySubscribedException = /** @class */ (function (_super) {
    __extends(AlreadySubscribedException, _super);
    function AlreadySubscribedException(username, subscription) {
        return _super.call(this, 401, username + " already subscribed to " + subscription) || this;
    }
    return AlreadySubscribedException;
}(HttpException_1.default));
exports.default = AlreadySubscribedException;
//# sourceMappingURL=AlreadySubscribedException.js.map