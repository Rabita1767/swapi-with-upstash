"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, status, message, cached = false, result = null) => {
    const response = {
        success: status < 400,
        message: message,
        cached: cached,
        data: result,
        error: null,
    };
    if (status >= 400) {
        response.success = false;
        response.error = result;
        response.message = "Internal server error";
    }
    else {
        response.success = true;
        response.cached = cached;
        response.data = result;
        response.message = "Successfully completed operations";
    }
    if (message) {
        response.message = message;
    }
    if (cached) {
        response.cached = cached;
    }
    res.status(status).send(response);
};
exports.sendResponse = sendResponse;
