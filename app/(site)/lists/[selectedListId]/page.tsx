import { Suspense } from 'react';

import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { prisma } from '@/lib/prisma';

import { TodosTableEditableRow } from './TodosTableEditableRow';
import { TodosTableFooter } from './TodosTableFooter';

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
          createdAt: true,
        },
        orderBy: {
          title: 'asc',
        },
      },
    },
  });
}

export default async function Page({ params }: { params: { selectedListId: string } }) {
  console.time('🚀 ~ file: page.tsx:33 ~ Page ~ getTodoList:');
  const todoList = await getTodoList(params.selectedListId);
  console.timeEnd('🚀 ~ file: page.tsx:33 ~ Page ~ getTodoList:');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <h4>{todoList.title}</h4>
        <Card className="mt-10 overflow-scroll w-full">
          <Table className="w-full min-w-max table-auto text-left">
            <TableHeader>
              <TableRow>
                <TableHead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-20">
                  <span color="blue-gray" className="font-normal leading-none opacity-70">
                    Done
                  </span>
                </TableHead>
                <TableHead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <span color="blue-gray" className="font-normal leading-none opacity-70">
                    Title
                  </span>
                </TableHead>
                <TableHead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-32">
                  <span color="blue-gray" className="font-normal leading-none opacity-70">
                    Created at
                  </span>
                </TableHead>
                <TableHead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todoList.todos.map(({ id, title, done, createdAt }) => (
                <TodosTableEditableRow key={id} id={id} title={title} done={done} createdAt={createdAt} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4} className="p-4 pb-3">
                  <TodosTableFooter
                    todoListId={todoList.id}
                    otherTodosTitles={todoList.todos.map((todo) => todo.title)}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
      </>
    </Suspense>
  );
}
