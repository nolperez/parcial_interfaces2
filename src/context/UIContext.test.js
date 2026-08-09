import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { UIProvider, useUI } from './UIContext';

jest.mock('../utils/swal', () => ({
  swalSuccess: jest.fn(),
  swalError: jest.fn(),
  swalInfo: jest.fn(),
}));

test('UIContext gestiona toasts con useReducer', () => {
  const wrapper = ({ children }) => <UIProvider>{children}</UIProvider>;
  const { result } = renderHook(() => useUI(), { wrapper });

  act(() => {
    result.current.success('Guardado');
  });

  expect(result.current.toasts).toHaveLength(1);
  expect(result.current.toasts[0].message).toBe('Guardado');
  expect(result.current.toasts[0].variant).toBe('success');

  act(() => {
    result.current.error('Falló');
  });

  expect(result.current.toasts.length).toBeGreaterThanOrEqual(2);
});
