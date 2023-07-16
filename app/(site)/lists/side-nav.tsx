'use client';

import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { ChangeEventHandler, useState, useTransition } from 'react';
import { LuPlus } from 'react-icons/lu';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { addTodoList } from './_actions';
import type { SideNavTodoLists } from './layout';

type SidebarProps = {
  todoLists: SideNavTodoLists;
};

export function SideNav({ todoLists: lists }: SidebarProps) {
  const { selectedListId } = useParams();
  const router = useRouter();

  const [, startTransition] = useTransition();

  const [newListTitle, setNewListTitle] = useState<string | undefined>(undefined);
  const onNewListTitleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => setNewListTitle(target.value);

  const canAddNewList =
    newListTitle && newListTitle.length > 0 && !lists.map((list) => list.title).includes(newListTitle);

  const onNewListAdded = () => {
    if (canAddNewList) {
      startTransition(() => addTodoList(newListTitle));
    }
  };

  // const onNewListRemoved = (id: string) => {
  //   startTransition(() => removeTodoList(id));
  // };

  const [openPopover, setOpenPopover] = useState(false);
  const triggers = {
    onMouseEnter: () => {
      setNewListTitle(undefined);
      setOpenPopover(true);
    },
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <Card className="relative w-full max-w-[20rem] p-4 shadow-xl shadow-light-blue-900/5 bg-light-blue-100 flex-col">
      <Command>
        <CommandInput placeholder="Type a menu item or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Todos">
            {lists.map((list) => {
              const listId = list.id;
              return (
                <CommandItem
                  key={listId}
                  onSelect={() => router.push(`/lists/${listId}`)}
                  selection={listId === selectedListId ? 'active' : 'inactive'}
                >
                  <span className="capitalize">{list.title}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
      <div className="absolute bottom-4 right-4">
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
          <PopoverTrigger {...triggers} asChild>
            <Button size="icon">
              <LuPlus className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent {...triggers} className="max-w-[24rem]">
            <div className="flex w-full max-w-sm items-stretch space-x-2">
              <Input type="text" placeholder="New List" value={newListTitle} onChange={onNewListTitleChange} />
              <Button size="icon" disabled={!canAddNewList} onClick={onNewListAdded}>
                <LuPlus className="h-5 w-5" />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
}
