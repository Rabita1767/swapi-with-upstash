"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConnected = exports.redisClient = void 0;
const redis_1 = require("redis");
let redisConnected = false;
exports.redisConnected = redisConnected;
const redisClient = (0, redis_1.createClient)();
exports.redisClient = redisClient;
redisClient.on("error", (err) => {
    console.error("⚠️ Redis error:", err);
    exports.redisConnected = redisConnected = false;
});
redisClient.connect()
    .then(() => {
    console.log("✅ Redis connected");
    exports.redisConnected = redisConnected = true;
})
    .catch((err) => {
    console.error("❌ Redis connection failed:", err);
    exports.redisConnected = redisConnected = false;
});
