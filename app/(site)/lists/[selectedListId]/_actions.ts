'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addTodo(todoListId: string, title: string) {
  await prisma.todo.create({
    data: {
      title,
      done: false,
      todoListId,
    },
  });
  revalidatePath('/lists/[selectedListId]');
}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({
    where: {
      id,
    },
  });
  revalidatePath('/lists/[selectedListId]');
}

export async function updateTodoDone(id: string, done: boolean) {
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      done,
    },
  });
  revalidatePath('/lists/[selectedListId]');
}

export async function updateTodoTitle(id: string, done: boolean) {
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      done,
    },
  });
  revalidatePath('/lists/[selectedListId]');
}