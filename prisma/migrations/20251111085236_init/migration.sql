-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "tildaUid" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "mark" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "photo" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priceOld" DOUBLE PRECISION,
    "editions" TEXT,
    "modifications" TEXT,
    "externalId" TEXT,
    "parentUid" TEXT,
    "engineType" TEXT NOT NULL,
    "engineVolume" DOUBLE PRECISION NOT NULL,
    "transmission" TEXT NOT NULL,
    "driveType" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "enginePower" DOUBLE PRECISION NOT NULL,
    "priceUSD" DOUBLE PRECISION NOT NULL,
    "countryOfOrigin" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "telegramId" INTEGER NOT NULL,
    "username" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "languageCode" TEXT NOT NULL,
    "chatId" INTEGER,
    "isBot" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Car_tildaUid_key" ON "Car"("tildaUid");

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");
