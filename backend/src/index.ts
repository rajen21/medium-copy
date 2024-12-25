import { Hono } from 'hono';
import { cors } from "hono/cors";
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

app.use("/*", cors());
app.route("/api/v1/user", userRoutes);
app.route("/api/v1/blog", blogRoutes);

export default app
