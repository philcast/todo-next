import { waitFor } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { describe, it } from 'vitest';

import { ThemeToggle } from './index';

describe('ThemeToggle', () => {
  it('should render a button with a sun and moon icon', () => {
    const { getByLabelText } = render(
      <ThemeProvider attribute="data-theme">
        <ThemeToggle />
      </ThemeProvider>
    );
    expect(getByLabelText('Toggle theme')).toBeInTheDocument();
  });

  it.skip('should toggle the theme when the button is clicked', async () => {
    const { getByLabelText } = render(
      <ThemeProvider attribute="data-theme" defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>
    );
    const button = getByLabelText('Toggle theme');

    let sun = getByLabelText('light-theme-icon');
    expect(sun).toBeInTheDocument();
    expect(sun).toHaveClass('rotate-0 scale-100');

    let moon = getByLabelText('dark-theme-icon');
    expect(moon).toBeInTheDocument();
    expect(moon).toHaveClass('rotate-90 scale-0');

    fireEvent.click(button);

    const lightRadio = getByLabelText('Light');
    await waitFor(() => expect(lightRadio).toBeInTheDocument());
    expect(lightRadio).toBeChecked();

    const darkRadio = getByLabelText('Dark');
    await waitFor(() => expect(darkRadio).toBeInTheDocument());
    expect(darkRadio).not.toBeChecked();

    fireEvent.click(darkRadio);

    await waitFor(() => expect(darkRadio).not.toBeInTheDocument());

    sun = getByLabelText('light-theme-icon');
    await waitFor(() => expect(sun).toBeInTheDocument());
    fireEvent.animationEnd(sun);
    expect(sun.getBoundingClientRect().x).toBe(0);

    moon = getByLabelText('dark-theme-icon');
    await waitFor(() => expect(moon).toBeInTheDocument());
    fireEvent.animationEnd(moon);
    expect(moon.getBoundingClientRect().x).toBeGreaterThan(0);
  });
});
