"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const character_route_1 = __importDefault(require("./routes/character.route"));
const error_middleware_1 = require("./middlewares/error.middleware");
const redisClient_1 = require("./cache/redisClient");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((req, res, next) => {
    next();
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Log Redis connection status
if (!redisClient_1.redisConnected) {
    console.warn("⚠️ Redis is not connected. Caching functionality will be disabled.");
}
else {
    console.log("✅ Redis is connected. Caching is enabled.");
}
app.use("/api/characters", character_route_1.default);
app.use(error_middleware_1.errorHandler);
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
