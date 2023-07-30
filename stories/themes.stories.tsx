import { Meta, StoryObj } from '@storybook/react';

import { ThemeColors } from './themes';

const meta: Meta<typeof ThemeColors> = {
  title: 'Themes/Colors',
  component: ThemeColors,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeColors>;

export const Default: Story = {
  args: {
  },
};