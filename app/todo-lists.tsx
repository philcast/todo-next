'use client';

import { TodoList } from "@prisma/client";

type TodoListsProps = {
  lists: TodoList[]
}

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function TodoLists({ lists }: TodoListsProps) {
  return (
    <div>
      {lists.map((list) => (
        <div key={list.id}>{list.title}</div>
      ))}
    </div>
  );
}