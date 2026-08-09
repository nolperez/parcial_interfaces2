import React, { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Offcanvas } from 'bootstrap';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'fa-solid fa-gauge-high', end: true },
  { path: '/dashboard/menus', label: 'Menus', icon: 'fa-solid fa-utensils' },
  { path: '/dashboard/bebidas', label: 'Bebidas', icon: 'fa-solid fa-wine-glass' },
  { path: '/dashboard/reservas', label: 'Reservas', icon: 'fa-solid fa-calendar-check' },
  { path: '/dashboard/promos', label: 'Promos', icon: 'fa-solid fa-tags' },
  { path: '/dashboard/mesas', label: 'Mesas', icon: 'fa-solid fa-chair' },
  { path: '/dashboard/usuarios', label: 'Usuarios', icon: 'fa-solid fa-users' },
];

const SidebarContent = ({ dismissOffcanvas = false }) => {
  const dismissProps = dismissOffcanvas ? { 'data-bs-dismiss': 'offcanvas' } : {};
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate('/login');
  };

  return (
    <>
      <div className="px-3 py-3 d-none d-lg-block border-bottom border-secondary border-opacity-25">
        <p className="admin-accent text-uppercase small text-center mb-0 fw-bold" style={{ fontSize: '0.65rem' }}>Admin</p>
        <h1 className="fw-bold text-white text-center text-uppercase mb-0" style={{ fontSize: '0.85rem' }}>Gourmet Fire Pit</h1>
      </div>

      <nav className="d-flex flex-column flex-grow-1 px-2 mt-2 gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            {...dismissProps}
            className={({ isActive }) =>
              `admin-nav-link text-decoration-none px-3 py-2 rounded-3 fw-semibold d-flex align-items-center gap-2 ${
                isActive ? 'active' : ''
              }`
            }
            style={{ fontSize: '0.85rem' }}
          >
            <i className={`${item.icon} fa-fw`} aria-hidden="true" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-2 mt-auto border-top border-secondary border-opacity-25">
        <button
          type="button"
          {...dismissProps}
          className="btn admin-btn-cancel btn-sm w-100 text-uppercase fw-bold rounded-3 py-2 d-flex align-items-center justify-content-center gap-2"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-right-from-bracket" aria-hidden="true" />
          <span>Salir</span>
        </button>
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
        className="admin-sidebar admin-sidebar-desktop text-white d-none d-lg-flex flex-column vh-100"
        style={{ width: 240 }}
        aria-label="Menú administración"
      >
        <SidebarContent />
      </aside>

      <aside
        className="offcanvas offcanvas-start d-lg-none text-white"
        tabIndex="-1"
        id="adminSidebar"
        aria-labelledby="adminSidebarLabel"
        style={{ width: 280 }}
      >
        <div className="offcanvas-header border-bottom border-secondary border-opacity-25">
          <div>
            <p className="admin-accent text-uppercase small mb-0 fw-bold">Admin</p>
            <h2 className="offcanvas-title fs-6 fw-bold text-white text-uppercase mb-0" id="adminSidebarLabel">
              Gourmet Fire Pit
            </h2>
          </div>
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
