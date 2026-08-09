/**
 * @jest-environment jsdom
 */

jest.mock('react-router-dom', () => ({
  MemoryRouter: ({ children }) => children,
  Navigate: () => null,
  useLocation: () => ({ pathname: '/cuenta' }),
}), { virtual: true });

jest.mock('./api/client', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.reject(new Error('no auth'))),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  },
}));

import { money } from './Components/dashboard/CrudPage';

test('formatea montos en moneda local', () => {
  expect(money(10)).toBe('S/ 10.00');
  expect(money(null)).toBe('S/ 0.00');
  expect(money(79.5)).toBe('S/ 79.50');
});

test('exporta helper money usable en UI', () => {
  expect(typeof money).toBe('function');
});
