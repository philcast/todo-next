import plugin from 'tailwindcss/plugin';

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
