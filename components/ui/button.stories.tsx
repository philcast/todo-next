import Link from 'next/link';

import type { Meta, StoryObj } from '@storybook/react';
import { LuSunMoon } from 'react-icons/lu';

import { Button } from './button';
import { Spinner } from './spinner';

const meta: Meta<typeof Button> = {
  title: 'Design System/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link', 'success', 'warning'],
      control: { type: 'inline-radio' },
      mandatory: false,
    },
    width: {
      options: ['default', 'full'],
      control: { type: 'inline-radio' },
      mandatory: false,
    },
    size: {
      options: ['default', 'sm', 'lg', 'icon'],
      control: { type: 'inline-radio' },
      edit: false,
      mandatory: false,
    },
    asChild: {
      control: false,
    },
    children: {
      name: 'label',
      control: 'text',
      defaultValue: 'Button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'default Button',
  },
  argTypes: {
    size: {
      control: false,
    },
    width: {
      control: false,
    },
  },
};

export const WithSMSize: Story = {
  name: 'With sm size',
  args: {
    size: 'sm',
    children: 'sm Button',
  },
  argTypes: {
    width: {
      control: false,
    },
    size: {
      control: false,
    },
  },
};

export const WithLGSize: Story = {
  name: 'With lg size',
  args: {
    size: 'lg',
    children: 'lg Button',
  },
  argTypes: {
    width: {
      control: false,
    },
    size: {
      control: false,
    },
  },
};

export const WithIcon: Story = {
  name: 'With icon',
  args: {
    size: 'icon',
    children: <LuSunMoon className="h-5 w-5" />,
  },
  argTypes: {
    width: {
      control: false,
    },
    size: {
      control: false,
    },
    children: {
      control: false,
    },
  },
};

export const WithIconAndLabel: Story = {
  name: 'With icon and label',
  args: {
    children: (
      <>
        <LuSunMoon className="h-5 w-5 mr-2" />
        Button with icon and label
      </>
    ),
  },
  argTypes: {
    width: {
      control: false,
    },
    size: {
      control: false,
    },
    children: {
      control: false,
    },
  },
};

export const WithFullWidth: Story = {
  name: 'With full width',
  args: {
    width: 'full',
    children: (
      <>
        <LuSunMoon className="h-5 w-5 mr-2" />
        Button with icon and label
      </>
    ),
  },
  argTypes: {
    width: {
      control: false,
    },
    size: {
      control: false,
    },
    children: {
      control: false,
    },
  },
};

export const WithLoadingState: Story = {
  name: 'With loading state',
  args: {
    disabled: true,
    children: (
      <>
        <Spinner className="h-5 w-5 mr-2" />
        Loading
      </>
    ),
  },
  argTypes: {
    width: {
      control: false,
    },
    size: {
      control: false,
    },
    children: {
      control: false,
    },
  },
};

export const AsChild: Story = {
  name: 'As child',
  args: {
    asChild: true,
    children: <Link href="/login">Login link</Link>,
  },
  argTypes: {
    width: {
      control: false,
    },
    size: {
      control: false,
    },
    children: {
      control: false,
    },
  },
};
