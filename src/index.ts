import { Hono } from "hono";

const app = new Hono();

app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  c.header("X-Response-Time", `${ms}ms`);
});
app.notFound((c) => {
  return c.text("Custom 404 Not Found", 404);
});
app.onError((err, c) => {
  console.error(`${err}`);
  return c.text("Custom Error Message", 500);
});

// HTTP Methods
app.get("/", (c) => {
  return c.text("working");
});
app.get("/users", (c) => {
  return c.json({ get: "get" });
});
app.get("/users/:id", (c) => {
  const id = c.req.param("id");
  return c.json({ get: id });
});
app.post("/users", (c) => {
  return c.json({ post: "post" });
});
app.patch("/users/:id", (c) => {
  const id = c.req.param("id");
  return c.json({ patch: id });
});
app.delete("/users/:id", (c) => {
  const id = c.req.param("id");
  return c.json({ delete: id });
});

export default app;
