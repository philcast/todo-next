import MatchMediaMock from 'jest-matchmedia-mock';

const matchMedia = new MatchMediaMock();
const mediaQuery = '(prefers-color-scheme: light)';
matchMedia.useMediaQuery(mediaQuery);

Object.defineProperty(window, 'matchMedia', matchMedia);
