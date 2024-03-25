import argon2 from 'argon2';
import { generateId, Session } from 'lucia';
import { cookies } from 'next/headers';
import { WithPrisma } from '@/app/db';
import { lucia } from '@/app/libs/auth';

export const signUp = async ({
  body,
  prisma,
}: {
  body: { username: string; password: string };
} & WithPrisma) => {
  const { username, password } = body;

  const emailExists = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (emailExists) {
    return {
      error: 'Email already exists',
    };
  }

  const hash = await argon2.hash(password);

  const user = await prisma.user.create({
    data: {
      id: generateId(15),
      username,
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
};

export const signIn = async ({
  body,
  prisma,
}: {
  body: { username: string; password: string };
} & WithPrisma) => {
  const { username, password } = body;

  const existingUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!existingUser) {
    return {
      error: 'Incorrect username or password',
    };
  }

  const validPassword = await argon2.verify(
    existingUser.hashed_password,
    password
  );

  if (!validPassword) {
    return {
      error: 'Incorrect username or password',
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};

export const signOut = async ({ session }: { session: Session | null }) => {
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};
