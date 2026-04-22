import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

let connection;
try {
  connection = await mysql.createConnection(process.env.DATABASE_URL!);
} catch (e) {
  console.warn('Could not connect to database on startup. Make sure MySQL is running.');
}

export const db = connection ? drizzle(connection, { schema, mode: 'default' }) : null;
