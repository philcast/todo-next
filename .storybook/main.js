/** @type { import('@storybook/nextjs').StorybookConfig } */
import path from 'path';

const config = {
  stories: ['../stories/**/*.mdx', '../components/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-controls',
    'storybook-addon-swc',
    {
      name: '@storybook/addon-styling',
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: {
          implementation: require.resolve('postcss'),
        },
      },
    },
  ],
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve = {
        ...config.resolve,
        alias: {
          ...(config.resolve.alias ?? {}),
          '@/app': path.resolve(__dirname, '../app'),
          '@/components': path.resolve(__dirname, '../components'),
          '@/lib': path.resolve(__dirname, '../lib'),
        },
      };
    }

    return config;
  },
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  docs: {
    autodocs: 'tag',
  },
};
export default config;
