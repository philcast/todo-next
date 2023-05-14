"use client";

import { useTransition } from "react";
import { Checkbox, IconButton, Spinner, Typography } from "../../../components/MaterialTailwind";
import { deleteTodo, updateTodoDone } from "./_actions";
import { TrashIcon } from "../../../components/HeroIcons";
import { DateFormater } from "../../../components/DateFormater";

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
        <Checkbox color="green" defaultChecked={done} onChange={onDoneChange} disabled={isLoading} />
      </td>
      <td className="px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
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