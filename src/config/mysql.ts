// src/config/mysql.ts
import mysql from 'mysql2/promise';

export const connectMySQL = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST || 'localhost',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD || '',
        });

        // Create the database if it doesn't exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`mr_chat\`;`);
        console.log('✅ MySQL: Database checked/created');

        // Connect again with the database
        await connection.changeUser({ database: 'mr_chat' });

        console.log('✅ MySQL connected to `mr_chat`');
    } catch (err) {
        console.error('❌ MySQL connection error:', err);
    }
};
