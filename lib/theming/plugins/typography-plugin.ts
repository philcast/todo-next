import plugin from 'tailwindcss/plugin';

/**
 * A Tailwind CSS plugin that adds base styles for typography elements such as headings, paragraphs, blockquotes, and code blocks.
 * @param {Object} options - The options object.
 * @param {Function} options.addBase - The function used to add base styles to the document.
 */
export const typographyPlugin = plugin(function ({ addBase }) {
  addBase({
    h1: {
      '@apply scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl': {},
    },
    h2: {
      '@apply scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0': {},
    },
    h3: {
      '@apply scroll-m-20 text-2xl font-semibold tracking-tight': {},
    },
    h4: {
      '@apply scroll-m-20 text-xl font-semibold tracking-tight': {},
    },
    p: {
      '@apply leading-7 [&:not(:first-child)]:mt-6': {},
    },
    blockquote: {
      '@apply mt-6 border-l-2 pl-6 italic': {},
    },
    ul: {
      '@apply my-6 ml-6 list-disc [&>li]:mt-2': {},
    },
    code: {
      '@apply relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold': {},
    },
  });
});