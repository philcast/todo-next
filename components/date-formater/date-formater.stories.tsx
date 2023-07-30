import { Meta, StoryObj } from '@storybook/react';

import { DateFormater } from './index';

const meta: Meta<typeof DateFormater> = {
  title: 'Design System/Atoms/DateFormater',
  component: DateFormater,
  tags: ['autodocs'],
  argTypes: {
    date: {
      control: 'date',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateFormater>;

export const Default: Story = {
  args: {
    date: new Date('2022-01-01T00:00:00.000Z'),
  },
};
