/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('IN_PROGRESS', 'WON', 'LOST');

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "wordId" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "status" "GameStatus" NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guess" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "word" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_value_key" ON "Word"("value");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guess" ADD CONSTRAINT "Guess_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guess" ADD CONSTRAINT "Guess_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
