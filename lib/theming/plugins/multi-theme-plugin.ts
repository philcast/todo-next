import plugin from 'tailwindcss/plugin';
import { z } from 'zod';

// Literal types for HSL colors.
const themeLiteralThemeSchema = z.string().describe('An HSL color literal.');
type ThemeLiteral = z.infer<typeof themeLiteralThemeSchema>;

// Recursive type for theme nodes.
type ThemeNode = ThemeLiteral | { [key: string]: ThemeNode };
const themeNodeSchema: z.ZodType<ThemeNode> = z.lazy(() =>
  z.union([themeLiteralThemeSchema, z.record(themeNodeSchema)])
);

// Type for theme root objects.
const themeRootSchema = z.record(themeNodeSchema);
export type ThemeRoot = z.infer<typeof themeRootSchema>;

// Type for the `colorThemes` map passed as an option to the Multi-Theme Plugin.
const themesJsonSchema = z.record(themeRootSchema);
export type ThemesRecord = z.infer<typeof themesJsonSchema>;

/**
 * An object containing CSS variable declarations.
 * The keys represent the CSS variable names and the values represent their values.
 */
export type CssVariablesDeclarations = Record<string, string>;

type TailwindColorNode = string | { [key: string]: TailwindColorNode };
/**
 * An object containing color utility declarations with CSS variable references.
 * The keys represent the utility names and the values represent their CSS variable references.
 */
export type ColorUtilitiesDeclarations = Record<string, TailwindColorNode>;

/**
 * Parses the `colorThemes` option passed to the Multi-Theme Plugin and validates it against the `themesJsonSchema`.
 * @param colorThemes An object containing at least one theme object.
 * @returns The validated `colorThemes` object.
 * @throws An error if the `colorThemes` object fails validation against the `themesJsonSchema`.
 */
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

/**
 * Recursively generates CSS variable declarations for a given theme object.
 * @param input The theme object to generate CSS variables for.
 * @param path An array of keys representing the path to the current object in the theme hierarchy.
 * @param output An object containing the CSS variable declarations.
 * @returns An object containing the CSS variable declarations.
 */
export function getCssVariableDeclarations(
  input: ThemeRoot,
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

/**
 * Recursively generates color utility declarations with CSS variable references for a given theme object.
 * @param input The theme object to generate color utility declarations for.
 * @param path An array of keys representing the path to the current object in the theme hierarchy.
 * @returns An object containing the color utility declarations with CSS variable references.
 */
export function getColorUtilitiesWithCssVariableReferences(
  input: ThemeRoot,
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

/**
 * An object containing the options for the Multi-Theme Plugin.
 * @property {ThemesRecord} colorThemes An object containing at least one theme object.
 */
interface MultiThemePluginOption {
  colorThemes: ThemesRecord;
}

/**
 * A Tailwind CSS plugin that enables multiple themes with CSS variables and color utilities.
 * @param options An object containing at least one theme object.
 * @returns A Tailwind CSS plugin object with two functions: `addBase` and `theme`.
 */
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
