import { Hono } from "hono";
import { posts } from "./posts";

const app = new Hono();

app.get("/", (c) => c.text("Hello! Hono!"));

app.route("/posts", posts);

export default app;
