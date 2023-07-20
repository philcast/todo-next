import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { describe, it } from 'vitest';

import { ThemeToggle } from './index';

describe('ThemeToggle', () => {
  it('should render a button with a sun and moon icon', () => {
    const { getByLabelText } = render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    expect(getByLabelText('Toggle theme')).toBeInTheDocument();
  });

  it('should toggle the theme when the button is clicked', () => {
    const { getByLabelText } = render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>
    );
    const button = getByLabelText('Toggle theme');
    expect(button).toHaveTextContent('sun');
    fireEvent.click(button);
    expect(button).toHaveTextContent('moon');
  });
});
