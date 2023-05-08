import { PrismaClient } from "@prisma/client";
import TodoLists from "./todo-lists";

const prisma = new PrismaClient();

export const metadata = {
  title: 'My Todo lists',
};

async function getTodoLists() {
  return await prisma.todoList.findMany();
}

export default async function Page() {
  const lists = await getTodoLists();
  return <TodoLists lists={lists}/>
}