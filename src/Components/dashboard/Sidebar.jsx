import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { Offcanvas } from 'bootstrap';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', end: true },
  { path: '/dashboard/menus', label: 'Menus' },
  { path: '/dashboard/bebidas', label: 'Bebidas' },
  { path: '/dashboard/reservas', label: 'Reservas' },
  { path: '/dashboard/promos', label: 'Promos' },
  { path: '/dashboard/mesas', label: 'Mesas' },
  { path: '/dashboard/usuarios', label: 'Usuarios' },
];

const SidebarContent = ({ dismissOffcanvas = false }) => {
  const dismissProps = dismissOffcanvas ? { 'data-bs-dismiss': 'offcanvas' } : {};

  return (
    <>
      <div className="p-3 pt-4 d-none d-lg-block">
        <h1 className="brand-title text-center mb-0">GOURMET FIRE PIT</h1>
      </div>

      <Nav className="flex-column flex-grow-1 px-2 mt-lg-3">
        {menuItems.map((item) => (
          <Nav.Link
            key={item.path}
            as={NavLink}
            to={item.path}
            end={item.end}
            {...dismissProps}
            className={({ isActive }) =>
              isActive ? 'nav-link active mb-1' : 'nav-link mb-1'
            }
          >
            {item.label}
          </Nav.Link>
        ))}
      </Nav>

      <div className="p-3 mt-auto">
        <Nav.Link
          as={NavLink}
          to="/login"
          {...dismissProps}
          className="text-center border border-secondary rounded py-2"
        >
          Salir
        </Nav.Link>
      </div>
    </>
  );
};

const Sidebar = () => {
  const location = useLocation();

  useEffect(() => {
    const sidebar = document.getElementById('adminSidebar');
    if (sidebar) {
      const instance = Offcanvas.getInstance(sidebar);
      instance?.hide();
    }
  }, [location.pathname]);

  return (
    <>
      <aside
        className="admin-sidebar d-none d-lg-flex flex-column vh-100"
        aria-label="Menú administración"
      >
        <SidebarContent />
      </aside>

      <aside
        className="admin-sidebar offcanvas offcanvas-start d-lg-none"
        tabIndex="-1"
        id="adminSidebar"
        aria-labelledby="adminSidebarLabel"
      >
        <div className="offcanvas-header border-bottom border-secondary">
          <h2 className="offcanvas-title brand-title mb-0" id="adminSidebarLabel">
            GOURMET FIRE PIT
          </h2>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Cerrar menú"
          />
        </div>
        <div className="offcanvas-body d-flex flex-column p-0">
          <SidebarContent dismissOffcanvas />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
