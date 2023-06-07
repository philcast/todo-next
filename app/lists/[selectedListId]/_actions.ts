'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
const prisma = new PrismaClient();

export async function addTodo(todoListId: string, title) {
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