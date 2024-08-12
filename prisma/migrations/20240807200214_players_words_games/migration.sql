/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Made the column `username` on table `Player` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "username" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Player_username_key" ON "Player"("username");
