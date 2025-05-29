// import { createClient } from "redis";

// let redisConnected = false;

// const redisClient = createClient();

// redisClient.on("error", (err) => {
//     console.error("⚠️ Redis error:", err);
//     redisConnected = false;
// });

// redisClient.connect()
//     .then(() => {
//         console.log("✅ Redis connected");
//         redisConnected = true;
//     })
//     .catch((err) => {
//         console.error("❌ Redis connection failed:", err);
//         redisConnected = false;
//     });

// export { redisClient, redisConnected };

import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default redis;
