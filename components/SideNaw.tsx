"use client";

import { Card, IconButton, Input, List, ListItem, Popover, PopoverContent, PopoverHandler } from "./MaterialTailwind";
import { PlusIcon } from "./HeroIcons";
import { useState, useTransition } from "react";
import { addTodoList } from "../app/_actions";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { SideNavTodoLists } from "../app/lists/layout";

type SidebarProps = {
  todoLists: SideNavTodoLists;
};

export function SideNav({ todoLists: lists }: SidebarProps) {
  const { selectedListId } = useParams();

  const [, startTransition] = useTransition();

  const [newListTitle, setNewListTitle] = useState<string | undefined>(undefined);
  const onNewListTitleChange = ({ target }) => setNewListTitle(target.value);

  const canAddNewList = newListTitle && newListTitle.length > 0 && !lists.map((list) => list.title).includes(newListTitle);

  const onNewListAdded = () => {
    if (canAddNewList) {
      addTodoList(newListTitle);
    }
  }

  const [openPopover, setOpenPopover] = useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <Card className="relative w-full max-w-[20rem] p-4 shadow-xl shadow-light-blue-900/5 bg-light-blue-100 flex-col">
      <List>
        {lists.map((list) => (
          <Link key={list.id} href={`/lists/${list.id}`} className="flex">
            <ListItem selected={list.id === selectedListId}>
              {list.title}
            </ListItem>
          </Link>
        ))}
      </List>
      <div className="absolute bottom-4 right-4">
        <Popover open={openPopover} handler={setOpenPopover} placement="top-end">
          <PopoverHandler {...triggers}>
            <IconButton size="lg" className="rounded-full">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </PopoverHandler>
          <PopoverContent {...triggers} className="max-w-[24rem]">
            <div className="relative flex w-full">
              <Input
                type="text"
                label="New List"
                value={newListTitle}
                onChange={onNewListTitleChange}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <IconButton
                size="sm"
                color={canAddNewList ? "blue" : "blue-gray"}
                disabled={!canAddNewList}
                className="!absolute right-1 top-1 rounded"
                onClick={() => startTransition(onNewListAdded)}
              >
                <PlusIcon className="h-5 w-5" />
              </IconButton>
            </div>

          </PopoverContent>
        </Popover>
      </div>
    </Card>
  )
}
