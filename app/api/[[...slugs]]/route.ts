import Elysia from "elysia";
import { helloWorld, signUp } from "./routes";

const app = new Elysia({ prefix: "/api" }).use(helloWorld).use(signUp);

// Expose methods
export const GET = app.handle;
export const POST = app.handle;

export type API = typeof app;
