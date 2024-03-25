import { t } from 'elysia';

export const authSchema = {
  'auth.sign-up': t.Object({
    password: t.String({
      minLength: 3,
      maxLength: 20,
    }),
    username: t.String({
      minLength: 5,
    }),
  }),
  'auth.sign-in': t.Object({
    password: t.String({
      minLength: 3,
      maxLength: 20,
    }),
    username: t.String({
      minLength: 5,
    }),
  }),
};
