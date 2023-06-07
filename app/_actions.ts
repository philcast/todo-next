'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
const prisma = new PrismaClient();

export async function addTodoList(title: string) {
  await prisma.todoList.create({
    data: {
      title: title,
    },
  });
  revalidatePath('/lists');
}

export async function removeTodoList(id: string) {
  await prisma.todoList.delete({
    where: {
      id,
    },
  });
  revalidatePath('/lists');
}