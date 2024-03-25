import { t } from 'elysia';

export const postSchema = {
  'post.get.id': t.Object({
    id: t.String(),
  }),
  'post.create': t.Object({
    title: t.String({
      minLength: 3,
      maxLength: 50,
    }),
    content: t.String({
      minLength: 3,
      maxLength: 50,
    }),
  }),
  'post.patch.params': t.Object({
    id: t.String(),
  }),
  'post.patch.body': t.Object(
    {
      title: t.Optional(
        t.String({
          minLength: 3,
          maxLength: 50,
        })
      ),
      content: t.Optional(
        t.String({
          minLength: 3,
          maxLength: 50,
        })
      ),
    },
    {
      minProperties: 1,
    }
  ),
  'post.delete': t.Object({
    id: t.String(),
  }),
};
