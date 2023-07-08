import { PrismaClient } from "@prisma/client";
import { SideNav } from "./SideNav";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: 'My Todo lists',
};

async function getSideNavTodoLists(userId?: string) {
  if (!userId) {
    return Promise.resolve([]);
  }
  return await prisma.todoList.findMany({
    select: {
      id: true,
      title: true,
    },
    where: {
      userId,
    },
    orderBy: {
      title: 'asc',
    }
  });
}

export type SideNavTodoLists = AwaitedReturnType<typeof getSideNavTodoLists>;

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  
  const lists = await getSideNavTodoLists(userId);

  return (
    <div className="flex h-full items-stretch gap-5">
      <SideNav todoLists={lists} />
      <div className="grow overflow-y-auto">
        {props.children}
      </div>
    </div>
  );
}