"use client";

import { Checkbox, IconButton, Spinner, Typography } from "@/components/MaterialTailwind";
import { deleteTodo, updateTodoDone } from "./_actions";
import { DateFormater } from "@/components/DateFormater";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";

type TodosTableEditableRowProps = { id: string; title: string; done: boolean, createdAt: Date };

export function TodosTableEditableRow({ id, title, done, createdAt }: TodosTableEditableRowProps) {
  const [isLoading, startTransition] = useTransition();

  // const [isEditing, setIsEditing] = useState(false);

  function onDoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    startTransition(() => updateTodoDone(id, checked));
  }

  function onDeleted() {
    startTransition(() => deleteTodo(id));
  }


  return (
    <tr className="even:bg-blue-gray-50/50">
      <td className="px-4">
        <Checkbox color="green" defaultChecked={done} onChange={onDoneChange} disabled={isLoading}
          className="rounded-full w-8 h-8 hover:before:opacity-0 hover:scale-105 bg-red-500/25 border-red-500/50 transition-all"  
        />
      </td>
      <td className="px-4">
        <Typography variant="small" color="blue-gray" className="font-normal capitalize">
          {title}
        </Typography>
      </td>
      <td className="px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          <DateFormater date={createdAt} />
        </Typography>
      </td>
      <td className="px-4">
       <div className="flex justify-end items-center">
            {isLoading && <Spinner className="mr-2" />}
            <IconButton
            size="sm"
            color="gray"
            className="rounded"
            onClick={() => startTransition(onDeleted)}
            disabled={isLoading}
            >
            <TrashIcon className="h-5 w-5" />
          </IconButton>
        </div>
      </td>
    </tr>
  );
}