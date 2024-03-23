import { Elysia, t } from "elysia";
import routeSetup from "@route-setup";

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
  .use(routeSetup)
  .get("/", ({ db }) => getPosts({ db }))
  .get("/:id", ({ params, db }) => getPost({ params, db }), {
    params: "post.get.id",
  })
  .post("/", ({ body, db }) => createPost({ body, db }), {
    body: "post.create",
  })
  .patch("/:id", ({ params, body, db }) => updatePost({ params, body, db }), {
    params: "post.patch.params",
    body: "post.patch.body",
  })
  .delete("/", ({ body, db }) => deletePost({ body, db }), {
    body: "post.delete",
  });

export default postRoutes;
