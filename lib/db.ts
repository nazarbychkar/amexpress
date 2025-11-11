import { PrismaClient } from "../lib/generated/prisma";

const globalForPrisma = globalThis as any;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ["query", "error", "warn"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
