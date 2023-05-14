"use client";

import { useTransition, useState } from "react";
import { PlusIcon } from "../../../components/HeroIcons";
import { IconButton, Input, Popover, PopoverContent, PopoverHandler, Spinner } from "../../../components/MaterialTailwind";
import { addTodo } from "./_actions";

type TodosTableFooterProps = { todoListId: string; otherTodosTitles: string[] };

export function TodosTableFooter({ todoListId, otherTodosTitles }: TodosTableFooterProps) {
  const [isLoading, startTransition] = useTransition();
  const [newTodoTitle, setNewTodoTitle] = useState<string | undefined>(undefined);
  const onNewTodoTitleChange = ({ target }) => setNewTodoTitle(target.value);

  const canAddNewTodo = !isLoading && newTodoTitle && newTodoTitle.length > 0 && !otherTodosTitles.includes(newTodoTitle);

  const onNewTodoAdded = () => {
    if (canAddNewTodo) {
      startTransition(() => addTodo(todoListId, newTodoTitle));
    }
  }

  const [openPopover, setOpenPopover] = useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <div className="flex justify-end">
      <Popover open={openPopover} handler={setOpenPopover} placement="left">
        <PopoverHandler {...triggers}>
          <IconButton size="lg" className="rounded-full">
            <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </IconButton>
        </PopoverHandler>
        <PopoverContent {...triggers} className="max-w-[300rem]">
          <div className="relative flex w-full">
            <Input
              type="text"
              label="New Todo item"
              value={newTodoTitle}
              onChange={onNewTodoTitleChange}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <IconButton
              size="sm"
              color={canAddNewTodo ? "blue" : "blue-gray"}
              disabled={!canAddNewTodo}
              className="!absolute right-1 top-1 rounded"
              onClick={onNewTodoAdded}
            >
              <PlusIcon className="h-5 w-5" />
            </IconButton>
          </div>

        </PopoverContent>
      </Popover>
      {isLoading && <Spinner className="ml-2" />}
    </div>
  );
}