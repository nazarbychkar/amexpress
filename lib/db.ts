import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
