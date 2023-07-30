'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';
import { LuPalette } from 'react-icons/lu';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-header-foreground hover:text-header"
          aria-label="Toggle theme"
        >
          <LuPalette role="img" aria-label="theme-icon" className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ThemeDropDownMenuRadioGroup />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ThemeDropDownMenuRadioGroup() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme} data-e2e="theme-dropdown-items">
      <DropdownMenuRadioItem value="light" aria-label="Light">
        Light
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="dark" aria-label="Dark">
        Dark
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="system" aria-label="System">
        System
      </DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  );
}
