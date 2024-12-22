import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt"
import { userRoutes } from './routes/user';
import { blogRoutes } from './routes/blogs';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables: {
    userId: string
  }
}>();

app.route("/api/v1/user", userRoutes);
app.route("/api/v1/blog", blogRoutes);

export default app
