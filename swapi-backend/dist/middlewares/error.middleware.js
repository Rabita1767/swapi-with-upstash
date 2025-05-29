"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const statusCode_1 = __importDefault(require("../constants/statusCode"));
const common_1 = require("../utils/common");
const errorHandler = (error, req, res, next) => {
    var _a, _b;
    console.log(error);
    const statusCode = (_a = error.statusCode) !== null && _a !== void 0 ? _a : 500;
    const message = (_b = error.message) !== null && _b !== void 0 ? _b : statusCode_1.default.INTERNAL_SERVER_ERROR;
    return (0, common_1.sendResponse)(res, statusCode, message);
};
exports.errorHandler = errorHandler;
