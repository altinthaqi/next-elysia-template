import { WithPrisma } from '@prisma-service';
import { NotFoundError } from 'elysia';

/**
 * Getting all posts
 */
export const getPosts = async ({ prisma }: WithPrisma) => {
  try {
    return await prisma.post.findMany({ orderBy: { createdAt: 'asc' } });
  } catch (error) {
    console.error(`Error getting posts: ${error}`);
  }
};

/**
 * Getting a post by ID
 */
export const getPost = async ({
  params,
  prisma,
}: { params: { id: string } } & WithPrisma) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(params.id) },
    });

    if (!post) {
      throw new NotFoundError('Post not found.');
    }

    return post;
  } catch (error) {
    console.error(`Error finding post: ${error}`);
  }
};

/**
 * Creating a post
 */
export const createPost = async ({
  body,
  prisma,
}: {
  body: {
    title: string;
    content: string;
  };
} & WithPrisma) => {
  try {
    const { title, content } = body;

    return await prisma.post.create({ data: { title, content } });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
  }
};

/**
 * Updating a post
 */
export const updatePost = async ({
  params,
  body,
  prisma,
}: {
  params: { id: string };
  body: { title?: string; content?: string };
} & WithPrisma) => {
  try {
    const { title, content } = body;

    return await prisma.post.update({
      where: { id: Number(params.id) },
      data: {
        ...(title ? { title } : {}),
        ...(content ? { content } : {}),
      },
    });
  } catch (error) {
    console.error(`Error updating post: ${error}`);
  }
};

/**
 * Deleting a post
 */
export const deletePost = async ({
  body,
  prisma,
}: { body: { id: string } } & WithPrisma) => {
  try {
    return await prisma.post.delete({
      where: { id: Number(body.id) },
    });
  } catch (error) {
    console.error(`Error deleting post: ${error}`);
  }
};
