import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { DateFormater } from './index';

describe('DateFormater', () => {
  it('should format the date correctly', () => {
    const date = new Date('2022-01-01T00:00:00.000Z');
    const { getByText } = render(<DateFormater date={date} />);
    expect(getByText('1/1/2022')).toBeInTheDocument();
  });

  it('should update the formatted date when the date prop changes', () => {
    const { getByText, rerender } = render(<DateFormater date={new Date('2022-01-01T00:00:00.000Z')} />);
    expect(getByText('1/1/2022')).toBeInTheDocument();
    rerender(<DateFormater date={new Date('2022-02-01T00:00:00.000Z')} />);
    expect(getByText('2/1/2022')).toBeInTheDocument();
  });
});
