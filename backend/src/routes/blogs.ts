import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput,  } from "@rajanchavda/medium-common";

export const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables: {
    userId: string
  }
}>();

blogRoutes.use("/*", async (c, next) => {
  try {
    const token = c.req.header("Authorization") || "";
    const user = await verify(token, c.env.JWT_SECRET);
    if (!user) {
      c.status(404);
      return c.json({
        message: "You are not logged in",
      })
    }
    c.set("userId", `${user.id}`);

    await next();
  } catch (error) {
    c.status(404);
    return c.json({
      message: "You are not logged in",
    })
  }
})


blogRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct!"
    });
  }
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(authorId)
    }
  });

  return c.json({
    blog,
    message: "Blog create successfully!"
  })
})

blogRoutes.put('/', async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct!"
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  await prisma.blog.update({
    where: {
      id: body.id
    },
    data: {
      title: body.title,
      content: body.content,
      authorId: 1
    }
  });
  return c.json({
    message: "Successfully updated blog!"
  })
});

blogRoutes.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const blogs = await prisma.blog.findMany({
      select: {
          content: true,
          title: true,
          id: true,
          author: {
              select: {
                  name: true
              }
          }
      }
  });

  return c.json({
      blogs
  })
});


blogRoutes.get('/:id', async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });
    return c.json({
      blog
    })
  } catch (error) {
    c.status(411);
    return c.json({
      message: "Error while fetching blog posts"
    })
  }
});