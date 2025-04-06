// src/app.ts
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

import ProfileRouter from './routes/profile';
import UserRouter from './routes/user';
import logger from './middlewares/logger';
import response from './utils/response';

import { connectMongoDB } from './config/mongo';
import { connectMySQL } from './config/mysql';
import { connectRedis } from './config/redis';
import { pgPool } from './config/postgres'; // pgPool is an instance, not a function

const app = express();

app.use(express.json());
app.use(logger);

// ✅ Initialize DB connections
connectMongoDB();
connectMySQL();
connectRedis();

// ✅ Routes
app.get('/api', (req, res) => {
    return response({ res, success: true, message: 'API IS RUNNING' });
});
app.use('/api/data', UserRouter);
app.use('/api/users', UserRouter);
app.use('/api/profile', ProfileRouter);

// ✅ Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
