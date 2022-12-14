import { Hono } from "hono";
import { cors } from "hono/cors";

const posts = new Hono();

posts.use("*", async (c, next) => {
  await next();
});

posts.use("*", cors());

posts.get("/", (c) => {
  return c.json({ message: "Hello Posts" });
});

posts.get("/", (c) => {
  return c.json({ data: "posts" });
});

posts.get("/:id", async (c) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "Not Found" }, 404);
  }
  return c.json({ message: id });
});

posts.post("/", async (c) => {
  const body = await c.req.json();
  return new Response(null, { status: 201 });
});

posts.patch("/:id", async (c) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "Not Found" }, 404);
  }
  const body = await c.req.json();
  if (!body) {
    return new Response(null, { status: 204 });
  }
  return new Response(null, { status: 200 });
});

posts.delete("/:id", async (c) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "Not Found" }, 404);
  }

  return new Response(null, { status: 200 });
});

export { posts };
