'use client';

import { ChangeEventHandler, useState, useTransition } from 'react';
import { LuPlus } from 'react-icons/lu';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';

import { addTodo } from './_actions';

type TodosTableFooterProps = { todoListId: string; otherTodosTitles: string[] };

export function TodosTableFooter({ todoListId, otherTodosTitles }: TodosTableFooterProps) {
  const [isLoading, startTransition] = useTransition();
  const [newTodoTitle, setNewTodoTitle] = useState<string | undefined>(undefined);

  const onNewTodoTitleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => setNewTodoTitle(target.value);

  const canAddNewTodo =
    !isLoading && newTodoTitle && newTodoTitle.length > 0 && !otherTodosTitles.includes(newTodoTitle);

  const onNewTodoAdded = () => {
    if (canAddNewTodo) {
      startTransition(() => addTodo(todoListId, newTodoTitle));
    }
  };

  const [openPopover, setOpenPopover] = useState(false);
  const triggers = {
    onMouseEnter: () => {
      setNewTodoTitle(undefined);
      setOpenPopover(true);
    },
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <div className="flex justify-end">
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger {...triggers} asChild>
          <Button size="icon">
            <LuPlus className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent {...triggers} className="max-w-[300rem]">
          <div className="flex w-full max-w-sm items-stretch space-x-2">
            <Input type="text" placeholder="New Todo item" value={newTodoTitle} onChange={onNewTodoTitleChange} />
            <Button size="icon" disabled={!canAddNewTodo} onClick={onNewTodoAdded}>
              <LuPlus className="w-5 h-5" />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      {isLoading && <Spinner className="ml-2" />}
    </div>
  );
}
