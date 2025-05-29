// import {redisClient,redisConnected} from "./redisClient";

// export const getCache = async (key: string): Promise<any> => {
//   if (!redisConnected) {
//       console.warn(`⚠️ Redis not connected. Skipping cache retrieval for key: ${key}`);
//       return null; // Fallback: No cache
//   }

//   try {
//       const data = await redisClient.get(key);
//       return data ? JSON.parse(data) : null;
//   } catch (err) {
//       console.error("⚠️ Redis GET error:", err);
//       return null; // Fallback: No cache
//   }
// };

// export const setCache = async (key: string, value: any, ttlSeconds: number = 600): Promise<void> => {
//   if (!redisConnected) {
//       console.warn(`⚠️ Redis not connected. Skipping cache storage for key: ${key}`);
//       return; // Fallback: No cache
//   }

//   try {
//       await redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds });
//   } catch (err) {
//       console.error("⚠️ Redis SET error:", err);
//   }
// };

import redis from "./redisClient"; // This is your Upstash Redis REST client

export const getCache = async (key: string): Promise<any> => {
  try {
    const data = await redis.get(key);
    return data ?? null;
  } catch (err) {
    console.error(`⚠️ Redis GET error for key "${key}":`, err);
    return null;
  }
};

export const setCache = async (key: string, value: any, ttlSeconds: number = 600): Promise<void> => {
  try {
    await redis.set(key, value, { ex: ttlSeconds });
  } catch (err) {
    console.error(`⚠️ Redis SET error for key "${key}":`, err);
  }
};
