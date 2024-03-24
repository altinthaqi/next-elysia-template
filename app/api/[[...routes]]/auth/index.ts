import prismaService from "@prisma-service";
import Elysia, { t } from "elysia";
import { cookies } from "next/headers";
import argon2 from "argon2";
import { generateId } from "lucia";
import { validateSession, lucia } from "@/app/libs/auth";

const schema = {
  "auth.sign-up": t.Object({
    name: t.String(),
    password: t.String({
      minLength: 3,
      maxLength: 20,
    }),
    email: t.String({
      minLength: 5,
    }),
  }),
  "auth.sign-in": t.Object({
    password: t.String({
      minLength: 3,
      maxLength: 20,
    }),
    email: t.String({
      minLength: 5,
    }),
  }),
};

const authRoutes = new Elysia()
  .model(schema)
  .use(prismaService)
  .post(
    "/sign-up",
    async ({ body, prisma }) => {
      const { email, password } = body;

      const emailExists = await prisma.user.findFirst({
        where: {
          username: email,
        },
      });

      if (emailExists) {
        return {
          error: "Email already exists",
        };
      }

      const hash = await argon2.hash(password);

      const user = await prisma.user.create({
        data: {
          id: generateId(15),
          username: email,
          hashed_password: hash,
        },
        select: {
          id: true,
        },
      });

      const session = await lucia.createSession(user.id, {});

      const sessionCookie = lucia.createSessionCookie(session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    },
    {
      body: "auth.sign-up",
    }
  )
  .post(
    "/sign-in",
    async ({ body, prisma }) => {
      const { email, password } = body;

      const existingUser = await prisma.user.findFirst({
        where: {
          username: email,
        },
      });

      if (!existingUser) {
        return {
          error: "Incorrect username or password",
        };
      }

      const validPassword = await argon2.verify(
        existingUser.hashed_password,
        password
      );

      if (!validPassword) {
        return {
          error: "Incorrect username or password",
        };
      }

      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    },
    {
      body: "auth.sign-in",
    }
  )
  .post("/sign-out", async () => {
    const { session } = await validateSession();
    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  });

export default authRoutes;
