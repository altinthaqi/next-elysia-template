import prismaService from '@prisma-service';
import Elysia from 'elysia';
import { signIn, signOut, signUp } from './handlers';
import { authMiddleware } from './middleware';
import { authSchema } from './schema';

const authRoutes = new Elysia()
  .model(authSchema)
  .use(prismaService)
  .use(authMiddleware)
  .post('/sign-up', async ({ body, prisma }) => signUp({ body, prisma }), {
    body: 'auth.sign-up',
  })
  .post('/sign-in', async ({ body, prisma }) => signIn({ body, prisma }), {
    body: 'auth.sign-in',
  })
  .get('/sign-out', async ({ session }) => signOut({ session }));

export default authRoutes;
