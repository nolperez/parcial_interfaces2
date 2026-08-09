import React from 'react';
import { Navbar, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const NavbarComponent = () => {
  const { user } = useAuth();

  return (
    <Navbar className="admin-navbar px-3 px-md-3 py-2 sticky-top">
      <div className="w-100 d-flex align-items-center gap-2 gap-md-3">
        <button
          type="button"
          className="btn btn-outline-light btn-sm d-lg-none flex-shrink-0 rounded-3"
          data-bs-toggle="offcanvas"
          data-bs-target="#adminSidebar"
          aria-controls="adminSidebar"
          aria-label="Abrir menú"
        >
          <i className="fa-solid fa-bars" aria-hidden="true" />
        </button>

        <Form className="flex-grow-1">
          <Form.Control
            type="search"
            size="sm"
            placeholder="Buscar en el panel..."
            className="admin-input rounded-pill px-3"
            aria-label="Buscar"
          />
        </Form>

        <div className="d-none d-sm-block text-end flex-shrink-0">
          <div className="text-secondary text-uppercase" style={{ fontSize: '0.65rem' }}>Bienvenido</div>
          <div className="fw-semibold text-white text-truncate" style={{ maxWidth: 140, fontSize: '0.85rem' }}>
            {user?.name || 'Admin'}
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 flex-shrink-0">
          <button
            type="button"
            className="btn btn-link admin-accent p-0 text-decoration-none"
            aria-label="Notificaciones"
          >
            <i className="fa-solid fa-bell" aria-hidden="true" />
          </button>

          <div
            className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 text-white"
            style={{ width: 32, height: 32, backgroundColor: '#d4580e', fontSize: '0.8rem' }}
            aria-label="Perfil de usuario"
          >
            <i className="fa-solid fa-user" aria-hidden="true" />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
