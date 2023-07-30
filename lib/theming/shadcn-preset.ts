import type { Config } from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';

import { corePlugin } from './plugins/core-plugin';
import { multiThemePlugin } from './plugins/multi-theme-plugin';
import { textShadowPlugin } from './plugins/text-shadow-plugin';
import { typographyPlugin } from './plugins/typography-plugin';
import themes from './themes.json';

export const shadcnPreset = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [],
  plugins: [animatePlugin, multiThemePlugin({ colorThemes: themes }), typographyPlugin, textShadowPlugin, corePlugin],
} satisfies Config;
