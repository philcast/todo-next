/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `TodoList` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TodoList" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT '101248486762785730760';

-- CreateIndex
CREATE UNIQUE INDEX "TodoList_userId_title_key" ON "TodoList"("userId", "title");
