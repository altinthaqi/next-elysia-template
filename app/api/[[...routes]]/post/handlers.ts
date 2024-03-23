import { NotFoundError } from "elysia";
import { DBType } from "@route-setup";

/**
 * Getting all posts
 */
export const getPosts = async ({ db }: DBType) => {
  try {
    return await db.post.findMany({ orderBy: { createdAt: "asc" } });
  } catch (error) {
    console.error(`Error getting posts: ${error}`);
  }
};

/**
 * Getting a post by ID
 */
export const getPost = async ({
  params,
  db,
}: { params: { id: number } } & DBType) => {
  try {
    const post = await db.post.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      throw new NotFoundError("Post not found.");
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
  db,
}: {
  body: {
    title: string;
    content: string;
  };
} & DBType) => {
  try {
    const { title, content } = body;

    return await db.post.create({ data: { title, content } });
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
  db,
}: {
  params: { id: number };
  body: { title?: string; content?: string };
} & DBType) => {
  try {
    const { title, content } = body;

    return await db.post.update({
      where: { id: params.id },
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
  db,
}: { body: { id: number } } & DBType) => {
  try {
    const { id } = body;

    return await db.post.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting post: ${error}`);
  }
};
