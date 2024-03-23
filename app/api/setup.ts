import Elysia from "elysia";
import db from "../db/index";

export type DBType = {
  db: typeof db;
};

export const setup = new Elysia({ name: "setup" }).decorate("db", db);

export default setup;
