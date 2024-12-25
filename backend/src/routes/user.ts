import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt"
import { signupInput, signinInput } from "@rajanchavda/medium-common";


export const userRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables: {
    userId: string
  }
}>();


userRoutes.post('/signup', async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name
      }
    });

    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET);
    return c.json({
      jwt
    })
  } catch (error) {
    c.status(411);
    return c.json({
      error: error instanceof Error ? error.message : "An unknown error occurred",
    })
  }

})


userRoutes.post('/signin', async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Input not correct!"
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password
      }
    });
    if (!user) {
      c.status(403);
      return c.json({
        message: "Wrong username"
      });
    }
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET);
    return c.text(jwt)
  } catch (error) {
    c.status(411);
    return c.text("Invalid!");
  }

})