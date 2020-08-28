"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var post_model_1 = __importDefault(require("../models/post.model"));
var PostNotFoundException_1 = __importDefault(require("../exceptions/PostNotFoundException"));
var NotAuthorizedException_1 = __importDefault(require("../exceptions/NotAuthorizedException"));
var post_validator_1 = __importDefault(require("../validators/post.validator"));
var validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
var auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
var deleteFile_1 = __importDefault(require("../utils/deleteFile"));
var PostController = /** @class */ (function () {
    function PostController() {
        var _this = this;
        this.path = '/posts';
        this.router = express_1.default.Router();
        this.post = post_model_1.default;
        this.createPost = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var postData, createdPost, post, message, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        postData = req.body;
                        createdPost = new this.post(__assign(__assign({}, postData), { image: req.file.path, author: req.user._id, url: "" + process.env.BASE_URL + this.path }));
                        return [4 /*yield*/, createdPost.save()];
                    case 1:
                        createdPost = _a.sent();
                        return [4 /*yield*/, this.post.findByIdAndUpdate(createdPost._id, {
                                url: "" + process.env.BASE_URL + this.path + "/" + createdPost._id,
                            }, { new: true })];
                    case 2:
                        post = _a.sent();
                        message = 'Post created successfully';
                        res.status(201).json({ message: message, post: post });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        next(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.deletePost = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, post, message, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        return [4 /*yield*/, this.post.findById(id)];
                    case 1:
                        post = _a.sent();
                        if (!post) {
                            throw new PostNotFoundException_1.default(id);
                        }
                        if (post.author.toString() !== req.user._id.toString()) {
                            throw new NotAuthorizedException_1.default();
                        }
                        deleteFile_1.default(post.image);
                        return [4 /*yield*/, this.post.findByIdAndDelete(id)];
                    case 2:
                        _a.sent();
                        message = 'Post deleted successfully';
                        res.status(200).json({ message: message });
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        next(err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getPostById = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, post, message, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, this.post.findById(id)];
                    case 1:
                        post = _a.sent();
                        if (!post) {
                            throw new PostNotFoundException_1.default(id);
                        }
                        message = 'Post fetched successfully';
                        res.status(200).json({ message: message, post: post });
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        next(err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updatePost = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, postData, post, message, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        postData = req.body;
                        return [4 /*yield*/, this.post.findByIdAndUpdate(id, postData, {
                                new: true,
                            })];
                    case 1:
                        post = _a.sent();
                        if (!post) {
                            throw new PostNotFoundException_1.default(id);
                        }
                        if (post.author.toString() !== req.user._id.toString()) {
                            throw new NotAuthorizedException_1.default();
                        }
                        message = 'Post updated successfully';
                        res.status(200).json({ message: message, post: post });
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        next(err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.initializeRoutes();
    }
    PostController.prototype.initializeRoutes = function () {
        this.router.get(this.path + "/:id", this.getPostById);
        this.router
            .all(this.path + "*", auth_middleware_1.default)
            .post(this.path, validation_middleware_1.default(post_validator_1.default.createPost), this.createPost)
            .delete(this.path + "/:id", this.deletePost)
            .patch(this.path + "/:id", validation_middleware_1.default(post_validator_1.default.updatePost), this.updatePost);
    };
    return PostController;
}());
exports.default = PostController;
//# sourceMappingURL=post.controller.js.map