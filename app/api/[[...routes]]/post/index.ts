import { Elysia, t } from "elysia";

import {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
} from "./handlers";

import { postSchema } from "./schema";

const postRoutes = new Elysia({ prefix: "/post" })
  .model(postSchema)
  .get("/", () => getPosts())
  .get("/:id", ({ params: { id } }) => getPost(id), {
    params: "post.get.id",
  })
  .post("/", ({ body }) => createPost(body), {
    body: "post.create",
  })
  .patch("/:id", ({ params: { id }, body }) => updatePost(id, body), {
    params: "post.patch.params",
    body: "post.patch.body",
  })
  .delete("/", ({ body }) => deletePost(body), {
    body: "post.delete",
  });

export default postRoutes;
