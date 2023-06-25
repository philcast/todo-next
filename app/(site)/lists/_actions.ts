'use server';

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

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