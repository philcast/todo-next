import plugin from 'tailwindcss/plugin';
import { z } from 'zod';

const themeLiteralThemeSchema = z.string();
type ThemeLiteral = z.infer<typeof themeLiteralThemeSchema>;
type ThemeNode = ThemeLiteral | { [key: string]: ThemeNode };
const themeNodeSchema: z.ZodType<ThemeNode> = z.lazy(() =>
  z.union([themeLiteralThemeSchema, z.record(themeNodeSchema)])
);
const themeSchema = z.record(themeNodeSchema);
export type Theme = z.infer<typeof themeSchema>;

const themesJsonSchema = z.record(themeSchema);
export type ThemesRecord = z.infer<typeof themesJsonSchema>;

type CssVariablesDeclarations = Record<string, string>;

export type TailwindColorNode = string | { [key: string]: TailwindColorNode };
type ColorUtilitiesDeclarations = Record<string, TailwindColorNode>;

export function parseThemes(colorThemes: ThemesRecord): ThemesRecord {
  const result = themesJsonSchema.safeParse(colorThemes);

  if (!result.success) {
    throw new Error(
      'The Multi-Theme Plugin expects a `colorThemes` option passed to it, which contains at least one theme object.',
      { cause: result.error }
    );
  }
  return result.data;
}

// Generate CSS variables
export function getCssVariableDeclarations(
  input: Theme,
  path: string[] = [],
  output: CssVariablesDeclarations = {}
): CssVariablesDeclarations {
  Object.entries(input).forEach(([key, value]) => {
    const newPath = path.concat(key);
    if (typeof value !== 'string') {
      getCssVariableDeclarations(value, newPath, output);
    } else {
      output[`--${newPath.join('-')}`] = value;
    }
  });
  return output;
}

// Generate color extension object
export function getColorUtilitiesWithCssVariableReferences(
  input: Theme,
  path: string[] = []
): ColorUtilitiesDeclarations {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => {
      const newPath = path.concat(key);
      if (typeof value !== 'string') {
        return [key, getColorUtilitiesWithCssVariableReferences(value, newPath)];
      } else {
        return [key, `hsl(var(--${newPath.join('-')}))`];
      }
    })
  );
}

interface MultiThemePluginOption {
  colorThemes: ThemesRecord;
}

export const multiThemePlugin = plugin.withOptions<MultiThemePluginOption>(
  function (options) {
    const colorThemes = parseThemes(options.colorThemes);

    return function ({ addBase }) {
      addBase({
        ':root': getCssVariableDeclarations(Object.values(colorThemes)[0]),
      });
      Object.entries(colorThemes).forEach(([key, value]) => {
        addBase({
          [`[data-theme="${key}"]`]: getCssVariableDeclarations(value),
        });
      });
    };
  },
  function (options) {
    const colorThemes = parseThemes(options.colorThemes);

    return {
      theme: {
        extend: {
          colors: getColorUtilitiesWithCssVariableReferences(Object.values(colorThemes)[0]),
        },
      },
    };
  }
);
