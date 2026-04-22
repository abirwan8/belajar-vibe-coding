import { Elysia } from 'elysia';
import { db } from './db';
import { users } from './db/schema';

const app = new Elysia()
  .get('/', () => ({
    message: 'Hello World from Elysia + Bun!',
    status: 'success'
  }))
  .get('/users', async () => {
    try {
      if (!db) {
        throw new Error('Database is not connected.');
      }
      const allUsers = await db.select().from(users);
      return {
        data: allUsers,
        status: 'success'
      };
    } catch (error) {
      return {
        message: 'Database connection failed or table does not exist.',
        status: 'error',
        details: error instanceof Error ? error.message : String(error)
      };
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
