import type { Config } from 'tailwindcss';

import { shadcnPreset } from './lib/theming/shadcn-tailwind-preset';

const config = {
  presets: [shadcnPreset],
  content: ['./stories/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
} satisfies Config;

export default config;
