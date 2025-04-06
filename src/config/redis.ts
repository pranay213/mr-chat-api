// src/config/db/redis.ts
import { createClient } from 'redis';

export const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('✅ Redis connected');
    } catch (err) {
        console.error('❌ Redis connection error:', err);
        process.exit(1);
    }
};
