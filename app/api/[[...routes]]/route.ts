import Elysia from "elysia";
import postRoutes from "./post";
import swagger from "@elysiajs/swagger";
import authRoutes from "./auth";
import { authMiddleware } from "./auth/middleware";
import cors, { HTTPMethod } from "@elysiajs/cors";

const corsConfig = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"] as HTTPMethod[],
  allowedHeaders: "*",
  exposedHeaders: "*",
  maxAge: 5,
  credentials: true,
};

const swaggerConfig = {
  documentation: {
    info: {
      title: "Next-Elysia API",
      description: "API documentation for Elysia",
      version: "1.0.0",
    },
  },
};

const app = new Elysia({ prefix: "/api" })
  .use(swagger(swaggerConfig))
  .use(cors(corsConfig))
  .use(authMiddleware)
  .use(authRoutes)
  .guard(
    {
      async beforeHandle({ set, session }) {
        if (!session) return (set.status = "Unauthorized");
      },
    },
    (app) => app.use(postRoutes)
  );

// Expose methods
export const GET = app.handle;
export const POST = app.handle;
export const PATCH = app.handle;
export const DELETE = app.handle;
export const PUT = app.handle;

export type API = typeof app;
