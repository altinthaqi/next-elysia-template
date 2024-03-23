import Elysia from "elysia";
import { helloWorld } from "./routes";

const app = new Elysia({ prefix: "/api" }).use(helloWorld);

// Expose methods
export const GET = app.handle;
export const POST = app.handle;

export type API = typeof app;
