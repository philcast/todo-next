import { PrismaClient } from "@prisma/client";
import { SideNav } from "../../components/SideNav";

const prisma = new PrismaClient();

export const metadata = {
  title: 'My Todo lists',
};

async function getSideNavTodoLists() {
  return await prisma.todoList.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      title: 'asc',
    }
  });
}

export type SideNavTodoLists = AwaitedReturnType<typeof getSideNavTodoLists>;

export default async function Layout(props) {
  const lists = await getSideNavTodoLists();

  return (
    <div className="flex h-full items-stretch gap-5">
      <SideNav todoLists={lists} />
      <div className="grow overflow-y-auto">
        {props.children}
      </div>
    </div>
  );
}