import { Card, Typography } from "@/components/MaterialTailwind";
import { Suspense } from "react";
import { TodosTableEditableRow } from "./TodosTableEditableRow";
import { TodosTableFooter } from "./TodosTableFooter";
import { prisma } from "@/lib/prisma";

async function getTodoList(id: string) {
  return await prisma.todoList.findUniqueOrThrow({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      todos: {
        select: {
          id: true,
          title: true,
          done: true,
          createdAt: true
        },
        orderBy: {
          title: 'asc',
        }
      }
    }
  });
}

export default async function Page({ params }: { params: { selectedListId: string } }) {
  
  console.time("🚀 ~ file: page.tsx:33 ~ Page ~ getTodoList:")
  const todoList = await getTodoList(params.selectedListId);
  console.timeEnd("🚀 ~ file: page.tsx:33 ~ Page ~ getTodoList:")

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Typography variant="h4" color="blue-gray">
          {todoList.title}
        </Typography>
        <Card className="mt-10 overflow-scroll w-full">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-20">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Done
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Title
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-32">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Created at
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {todoList.todos.map(({ id, title, done, createdAt }) => (
                <TodosTableEditableRow key={id} id={id} title={title} done={done} createdAt={createdAt} />
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan={4} className="p-4 pb-3">
                  <TodosTableFooter todoListId={todoList.id} otherTodosTitles={todoList.todos.map(todo => todo.title)} />
                </td>
              </tr>
            </tfoot>
          </table>
        </Card>
      </>
    </Suspense>
  );
}