-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "theme" TEXT,
    "thumbnail" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
