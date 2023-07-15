'use client';

import { useTransition } from 'react';
import { LuTrash } from 'react-icons/lu';

import { DateFormater } from '@/components/DateFormater';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Spinner } from '@/components/ui/spinner';
import { TableCell, TableRow } from '@/components/ui/table';

import { deleteTodo, updateTodoDone } from './_actions';

type TodosTableEditableRowProps = { id: string; title: string; done: boolean; createdAt: Date };

export function TodosTableEditableRow({ id, title, done, createdAt }: TodosTableEditableRowProps) {
  const [isLoading, startTransition] = useTransition();

  function onDoneChange(done: boolean) {
    startTransition(() => updateTodoDone(id, done));
  }

  function onDeleted() {
    startTransition(() => deleteTodo(id));
  }

  return (
    <TableRow className="even:bg-blue-gray-50/50">
      <TableCell className="px-4">
        <Checkbox
          defaultChecked={done}
          onCheckedChange={onDoneChange}
          disabled={isLoading}
          variant="validation"
          shape="rounded"
          className="w-8 h-8"
        />
      </TableCell>
      <TableCell className="px-4">
        <span color="blue-gray" className="font-normal capitalize">
          {title}
        </span>
      </TableCell>
      <TableCell className="px-4">
        <span color="blue-gray" className="font-normal">
          <DateFormater date={createdAt} />
        </span>
      </TableCell>
      <TableCell className="px-4">
        <div className="flex justify-end items-center">
          {isLoading && <Spinner className="mr-2" />}
          <Button variant="secondary" size="icon" onClick={() => startTransition(onDeleted)} disabled={isLoading}>
            <LuTrash className="h-5 w-5" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
