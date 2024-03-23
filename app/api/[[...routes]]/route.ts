import Elysia from "elysia";
import postRoutes from "./post";

const app = new Elysia({ prefix: "/api" }).use(postRoutes);

// Expose methods
export const GET = app.handle;
export const POST = app.handle;
export const PATCH = app.handle;
export const DELETE = app.handle;
export const PUT = app.handle;

export type API = typeof app;
