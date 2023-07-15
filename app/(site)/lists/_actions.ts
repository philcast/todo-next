'use server';

import { revalidatePath } from 'next/cache';

import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function addTodoList(title: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error('User not found');
  }
  await prisma.todoList.create({
    data: {
      userId,
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
