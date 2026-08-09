import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { swalError, swalInfo, swalSuccess } from '../utils/swal';

const UIContext = createContext(null);

const initialState = {
  toasts: [],
};

function uiReducer(state, action) {
  switch (action.type) {
    case 'TOAST_ADD':
      return { ...state, toasts: [...state.toasts, action.payload] };
    case 'TOAST_REMOVE':
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload),
      };
    case 'TOAST_CLEAR':
      return { ...state, toasts: [] };
    default:
      return state;
  }
}

export function UIProvider({ children }) {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const removeToast = useCallback((id) => {
    dispatch({ type: 'TOAST_REMOVE', payload: id });
  }, []);

  const notify = useCallback((message, variant = 'success', timeout = 3200) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    dispatch({
      type: 'TOAST_ADD',
      payload: { id, message, variant },
    });
    window.setTimeout(() => {
      dispatch({ type: 'TOAST_REMOVE', payload: id });
    }, timeout);

    if (variant === 'danger' || variant === 'error') swalError(message);
    else if (variant === 'info') swalInfo(message);
    else swalSuccess(message);

    return id;
  }, []);

  const success = useCallback((message) => notify(message, 'success'), [notify]);
  const error = useCallback((message) => notify(message, 'danger'), [notify]);
  const info = useCallback((message) => notify(message, 'info'), [notify]);

  const value = useMemo(
    () => ({
      toasts: state.toasts,
      notify,
      removeToast,
      success,
      error,
      info,
    }),
    [state.toasts, notify, removeToast, success, error, info]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI debe usarse dentro de UIProvider');
  return ctx;
}
