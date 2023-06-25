/*
  Warnings:

  - A unique constraint covering the columns `[todoListId,title]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateExtension citext
CREATE EXTENSION IF NOT EXISTS citext;

-- DropIndex
DROP INDEX "TodoList_title_key";

-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "title" SET DATA TYPE CITEXT;

-- AlterTable
ALTER TABLE "TodoList" ALTER COLUMN "title" SET DATA TYPE CITEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Todo_todoListId_title_key" ON "Todo"("todoListId", "title");
