import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import { AppHeader } from '.';

describe('AppHeader', () => {
  it('Should render the title', () => {
    render(<AppHeader title="My TODOs" />);
    expect(screen.getByText('My TODOs')).toBeInTheDocument();
  });
});
