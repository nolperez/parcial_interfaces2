import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', end: true },
  { path: '/dashboard/menus', label: 'Menus' },
  { path: '/dashboard/bebidas', label: 'Bebidas' },
  { path: '/dashboard/reservas', label: 'Reservas' },
  { path: '/dashboard/promos', label: 'Promos' },
  { path: '/dashboard/mesas', label: 'Mesas' },
  { path: '/dashboard/usuarios', label: 'Usuarios' },
];

const Sidebar = () => {
  return (
    <aside className="admin-sidebar d-flex flex-column vh-100">
      <div className="p-3 pt-4">
        <h1 className="brand-title text-center mb-0">
          GOURMET FIRE PIT
        </h1>
      </div>

      <Nav className="flex-column flex-grow-1 px-2 mt-3">
        {menuItems.map((item) => (
          <Nav.Link
            key={item.path}
            as={NavLink}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive ? 'nav-link active mb-1' : 'nav-link mb-1'
            }
          >
            {item.label}
          </Nav.Link>
        ))}
      </Nav>

      <div className="p-3 mt-auto">
        <Nav.Link as={NavLink} to="/login" className="text-center border border-secondary rounded py-2">
          Salir
        </Nav.Link>
      </div>
    </aside>
  );
};

export default Sidebar;
