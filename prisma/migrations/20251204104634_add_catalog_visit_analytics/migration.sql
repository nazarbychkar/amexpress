-- CreateTable
CREATE TABLE "CatalogVisit" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "phone" TEXT,
    "username" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CatalogVisit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CatalogVisit" ADD CONSTRAINT "CatalogVisit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
