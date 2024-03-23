import Elysia from "elysia";
import db from "../db/index";

export type WithDBType = {
  db: typeof db;
};

const setup = new Elysia({ name: "setup" }).decorate("db", db);

export default setup;
