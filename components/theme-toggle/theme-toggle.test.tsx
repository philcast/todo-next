import { render, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('should toggle the theme when the button is clicked', async () => {
    const { getByLabelText, findByLabelText } = render(
      <ThemeProvider attribute="data-theme" defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>
    );
    const toggleThemeButton = getByLabelText('Toggle theme');
    expect(toggleThemeButton).toBeInTheDocument();

    userEvent.click(toggleThemeButton);

    let lightRadio = (await findByLabelText('Light')) as HTMLInputElement;
    let darkRadio = (await findByLabelText('Dark')) as HTMLInputElement;
    let systemRadio = (await findByLabelText('System')) as HTMLInputElement;

    expect(lightRadio).toBeInTheDocument();
    expect(lightRadio).toBeChecked();

    expect(darkRadio).toBeInTheDocument();
    expect(darkRadio).not.toBeChecked();

    expect(systemRadio).toBeInTheDocument();
    expect(systemRadio).not.toBeChecked();

    userEvent.click(darkRadio);

    await waitForElementToBeRemoved(() => getByLabelText('Dark'));

    userEvent.click(toggleThemeButton);

    lightRadio = (await findByLabelText('Light')) as HTMLInputElement;
    darkRadio = (await findByLabelText('Dark')) as HTMLInputElement;
    systemRadio = (await findByLabelText('System')) as HTMLInputElement;

    expect(lightRadio).toBeInTheDocument();
    expect(lightRadio).not.toBeChecked();

    expect(darkRadio).toBeInTheDocument();
    expect(darkRadio).toBeChecked();

    expect(systemRadio).toBeInTheDocument();
    expect(systemRadio).not.toBeChecked();
  });
});
