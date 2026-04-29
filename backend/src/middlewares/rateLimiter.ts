import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import redis from "../lib/redis.js";

export const apiLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: any[]) => redis.call(...args) as Promise<any>,
  }),
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // 100 requests per IP

  standardHeaders: true, // RateLimit-* headers
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
  },
});

export const authLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.call(...args) as Promise<any>,
  }),

  windowMs: 10 * 60 * 1000, // 10 min
  max: 5, // only 5 attempts

  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many login attempts. Try again later.",
    });
  },
});