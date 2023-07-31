import { describe, it } from 'vitest';

import {
  ThemeRoot,
  getColorUtilitiesWithCssVariableReferences,
  getCssVariableDeclarations,
  parseThemes,
} from './multi-theme-plugin';

describe('parseThemes', () => {
  it('should throw an error if the input is not a valid theme object', () => {
    const invalidInput: any = { theme1: { primary: 'red' }, theme2: { primary: 123 } };
    expect(() => parseThemes(invalidInput)).toThrowError();
  });

  it('should return the input if it is a valid theme object', () => {
    const validInput = { theme1: { primary: 'red' }, theme2: { primary: 'blue' } };
    expect(parseThemes(validInput)).toEqual(validInput);
  });
});

describe('getCssVariableDeclarations', () => {
  it('should generate CSS variable declarations for a given theme object', () => {
    const theme: ThemeRoot = { primary: 'red', secondary: { light: 'blue', dark: 'navy' } };
    const expectedOutput = {
      '--primary': 'red',
      '--secondary-light': 'blue',
      '--secondary-dark': 'navy',
    };
    expect(getCssVariableDeclarations(theme)).toEqual(expectedOutput);
  });
});

describe('getColorUtilitiesWithCssVariableReferences', () => {
  it('should generate color utility declarations with CSS variable references for a given theme object', () => {
    const theme: ThemeRoot = {
      primary: 'hsl(0, 100%, 50%)',
      secondary: { light: 'hsl(240, 100%, 75%)', dark: 'hsl(240, 100%, 25%)' },
    };
    const expectedOutput = {
      primary: 'hsl(var(--primary))',
      secondary: {
        light: 'hsl(var(--secondary-light))',
        dark: 'hsl(var(--secondary-dark))',
      },
    };
    expect(getColorUtilitiesWithCssVariableReferences(theme)).toEqual(expectedOutput);
  });
});
