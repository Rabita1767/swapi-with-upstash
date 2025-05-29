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
const redisClient_1 = require("../cache/redisClient");
const clearAllCache = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keys = yield redisClient_1.redisClient.keys('*'); // Or use 'search:*' to filter specific keys
        if (keys.length > 0) {
            yield redisClient_1.redisClient.del(keys);
            console.log(`✅ Deleted ${keys.length} keys from Redis.`);
        }
        else {
            console.log('ℹ️ No keys found to delete.');
        }
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error clearing Redis cache:', error);
        process.exit(1);
    }
});
clearAllCache();
