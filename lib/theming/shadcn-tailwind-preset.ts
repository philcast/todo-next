import type { Config } from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';

import { coreShadcnPlugin } from './plugins/core-shadcn-plugin';
import { multiThemePlugin } from './plugins/multi-theme-plugin';
import { textShadowPlugin } from './plugins/text-shadow-plugin';
import { typographyPlugin } from './plugins/typography-plugin';
import themes from './themes.json';

/**
 * The Shadcn Tailwind preset.
 *
 * This preset includes custom plugins and themes for the Shadcn design system.
 *
 * @since 1.0.0
 */
export const shadcnPreset = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [],
  plugins: [
    animatePlugin,
    multiThemePlugin({ colorThemes: themes }),
    typographyPlugin,
    textShadowPlugin,
    coreShadcnPlugin,
  ],
} satisfies Config;
