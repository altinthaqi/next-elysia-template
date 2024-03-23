import Elysia from "elysia";

export const helloWorld = new Elysia().get("/hello-world", () => {
  return {
    message: "Hello world!",
  };
});
