-- DropIndex
DROP INDEX "Todo_todoListId_title_key";

-- AlterTable
ALTER TABLE "TodoList" ALTER COLUMN "title" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "title" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TodoList_title_key" ON "TodoList"("title" ASC);

