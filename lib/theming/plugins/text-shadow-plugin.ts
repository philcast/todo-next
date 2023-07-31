import plugin from 'tailwindcss/plugin';

/**
 * A Tailwind CSS plugin that adds utilities for text shadows.
 *
 * @param {Object} options - The plugin options.
 * @param {Function} options.addUtilities - A function to add the generated utilities to the stylesheet.
 * @param {Object} options.theme - The theme object.
 * @param {Object} options.theme.extend.textShadow - The text shadow values to use in the generated utilities.
 *
 * @returns {Function} - The plugin function.
 */
export const textShadowPlugin = plugin(
  function ({ addUtilities, theme }) {
    addUtilities({
      'text-shadow-lg': theme('textShadow.lg'),
      'text-shadow-md': theme('textShadow.md'),
      'text-shadow-sm': theme('textShadow.sm'),
    });
  },
  {
    theme: {
      extend: {
        textShadow: {
          lg: '0 8px 16px var(--tw-shadow-color)',
          md: '0 2px 4px var(--tw-shadow-color)',
          sm: '0 1px 2px var(--tw-shadow-color)',
        },
      },
    },
  }
);
