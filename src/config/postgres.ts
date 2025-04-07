import pkg from 'pg';
const { Pool } = pkg;

export const pgPool = new Pool({
    connectionString: process.env.PG_URL, // Your full external PostgreSQL URL
    ssl: {
        rejectUnauthorized: false // ✅ This is the key fix
    }
});

pgPool.on('connect', () => {
    console.log('✅ PostgreSQL connected');
});

pgPool.on('error', (err) => {
    console.error('❌ PostgreSQL connection error:', err);
});

(async () => {
    try {
        await pgPool.connect();
    } catch (err) {
        console.error('❌ PostgreSQL initial connect error:', err);
    }
})();
