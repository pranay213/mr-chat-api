// src/config/db/mongo.ts
import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';
configDotenv()

export const connectMongoDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mr-chat';
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB connected', MONGO_URI);
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
};
