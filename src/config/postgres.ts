// src/config/postgres.ts
import pkg from 'pg';
const { Pool } = pkg;

export const pgPool = new Pool({
    host: process.env.PG_HOST || 'localhost',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || '',
    database: process.env.PG_DB || 'mr_chat',
    port: Number(process.env.PG_PORT) || 5432,
});

pgPool.on('connect', () => {
    console.log('✅ PostgreSQL connected');
});

pgPool.on('error', (err) => {
    console.error('❌ PostgreSQL connection error:', err);
});

// You can optionally do an initial connection test:
(async () => {
    try {
        await pgPool.connect(); // just to trigger connection once
    } catch (err) {
        console.error('❌ PostgreSQL initial connect error:', err);
    }
})();
