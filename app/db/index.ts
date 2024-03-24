import { PrismaClient } from "@prisma/client";
import Elysia from "elysia";

export type WithPrisma = {
  prisma: typeof prisma;
};

const prisma = new PrismaClient();

const prismaService = new Elysia({ name: "prismaService" }).decorate({
  prisma,
});

export default prismaService;
