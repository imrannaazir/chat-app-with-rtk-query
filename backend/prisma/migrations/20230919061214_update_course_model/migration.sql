/*
  Warnings:

  - You are about to drop the column `credist` on the `courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "credist",
ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 0;
