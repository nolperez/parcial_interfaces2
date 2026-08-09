import React, { memo, useCallback } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useUI } from '../context/UIContext';

function ToastViewport() {
  const { toasts, removeToast } = useUI();

  const onClose = useCallback((id) => () => removeToast(id), [removeToast]);

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1080 }}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          bg={toast.variant}
          onClose={onClose(toast.id)}
          autohide
          delay={3200}
        >
          <Toast.Body className={`d-flex align-items-start gap-2 ${toast.variant === 'info' ? 'text-dark' : 'text-white'}`}>
            <i
              className={`fa-solid mt-1 ${
                toast.variant === 'success'
                  ? 'fa-circle-check'
                  : toast.variant === 'danger'
                    ? 'fa-circle-exclamation'
                    : 'fa-circle-info'
              }`}
              aria-hidden="true"
            />
            <span>{toast.message}</span>
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}

export default memo(ToastViewport);
