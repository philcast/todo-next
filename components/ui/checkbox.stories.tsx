import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Design System/Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'validation'],
      control: { type: 'inline-radio' },
      mandatory: false,
    },
    shape: {
      options: ['default', 'rounded'],
      control: { type: 'inline-radio' },
      mandatory: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};

export const WithRoundedShape: Story = {
  name: 'With rounded shape',
  args: {
    shape: 'rounded',
  },
};

export const WithValidationStyleAndRoundedShape: Story = {
  name: 'With validation style and rounded shape',
  args: {
    variant: 'validation',
    shape: 'rounded',
  },
};
