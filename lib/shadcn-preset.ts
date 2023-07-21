import type { Config } from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';

import { shadcnPlugin } from './shadcn-plugin';

export const shadcnPreset = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [],
  plugins: [animatePlugin, shadcnPlugin],
} satisfies Config;
