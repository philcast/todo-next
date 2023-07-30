import matchers from '@testing-library/jest-dom/matchers';
import { configure } from '@testing-library/react';
import { expect, vi } from 'vitest';

expect.extend(matchers);

configure({ testIdAttribute: 'data-e2e' });

Object.defineProperty(global, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

//TODO Setup MSW
