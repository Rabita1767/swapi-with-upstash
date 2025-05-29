"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCache = exports.getCache = void 0;
const redisClient_1 = require("./redisClient");
const getCache = (key) => __awaiter(void 0, void 0, void 0, function* () {
    if (!redisClient_1.redisConnected) {
        console.warn(`⚠️ Redis not connected. Skipping cache retrieval for key: ${key}`);
        return null; // Fallback: No cache
    }
    try {
        const data = yield redisClient_1.redisClient.get(key);
        return data ? JSON.parse(data) : null;
    }
    catch (err) {
        console.error("⚠️ Redis GET error:", err);
        return null; // Fallback: No cache
    }
});
exports.getCache = getCache;
const setCache = (key_1, value_1, ...args_1) => __awaiter(void 0, [key_1, value_1, ...args_1], void 0, function* (key, value, ttlSeconds = 600) {
    if (!redisClient_1.redisConnected) {
        console.warn(`⚠️ Redis not connected. Skipping cache storage for key: ${key}`);
        return; // Fallback: No cache
    }
    try {
        yield redisClient_1.redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds });
    }
    catch (err) {
        console.error("⚠️ Redis SET error:", err);
    }
});
exports.setCache = setCache;
