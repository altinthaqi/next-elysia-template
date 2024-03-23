import { Elysia, t } from "elysia";
import db from "@db";

const userSchema = {
  "user.request": t.Object({
    username: t.String(),
    password: t.String({
      minLength: 3,
    }),
  }),
  "user.response": t.Object({
    id: t.Number(),
    username: t.String(),
  }),
};

export const signUp = new Elysia().model(userSchema).post(
  "/sign-up",
  async ({ body }) =>
    db.user.create({
      data: body,
      select: {
        id: true,
        username: true,
      },
    }),
  {
    body: "user.request",
    response: "user.response",

    error({ code }) {
      switch (code) {
        // Prisma P2002: "Unique constraint failed on the {constraint}"
        // @ts-ignore
        case "P2002":
          return {
            error: "Username must be unique",
          };
        default:
          return {
            error: "Unknown error occurred",
          };
      }
    },
  }
);
