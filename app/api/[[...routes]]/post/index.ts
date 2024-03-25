import prismaService from '@prisma-service';
import { Elysia } from 'elysia';
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from './handlers';
import { postSchema } from './schema';

const postRoutes = new Elysia({ prefix: '/posts' })
  .model(postSchema)
  .use(prismaService)
  .get('/', ({ prisma }) => getPosts({ prisma }))
  .get('/:id', ({ params, prisma }) => getPost({ params, prisma }), {
    params: 'post.get.id',
  })
  .post('/', ({ body, prisma }) => createPost({ body, prisma }), {
    body: 'post.create',
  })
  .patch(
    '/:id',
    ({ params, body, prisma }) => updatePost({ params, body, prisma }),
    {
      params: 'post.patch.params',
      body: 'post.patch.body',
    }
  )
  .delete('/', ({ body, prisma }) => deletePost({ body, prisma }), {
    body: 'post.delete',
  });

export default postRoutes;
