import Elysia from 'elysia';
import { verifyRequestOrigin } from 'lucia';
import type { Session, User } from 'lucia';
import { lucia } from '@/app/libs/auth';

export const authMiddleware = new Elysia().derive(
  { as: 'global' },
  async (
    context
  ): Promise<{
    user: User | null;
    session: Session | null;
  }> => {
    // CSRF check
    if (context.request.method !== 'GET') {
      const originHeader = context.request.headers.get('Origin');
      const hostHeader = context.request.headers.get('Host');
      if (
        !originHeader ||
        !hostHeader ||
        !verifyRequestOrigin(originHeader, [hostHeader])
      ) {
        return {
          user: null,
          session: null,
        };
      }
    }

    const cookieHeader = context.request.headers.get('Cookie') ?? '';
    const sessionId = lucia.readSessionCookie(cookieHeader);
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookie[sessionCookie.name].set({
        value: sessionCookie.value,
        ...sessionCookie.attributes,
      });
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      context.cookie?.[sessionCookie.name].set({
        value: sessionCookie.value,
        ...sessionCookie.attributes,
      });
    }
    return {
      user,
      session,
    };
  }
);
