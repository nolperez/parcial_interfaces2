import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../logo.png';
import { useAuth } from '../../context/AuthContext';
import './navegacion.css';

const linkClass = ({ isActive }) =>
  `nav-site-link ${isActive ? 'is-active' : ''}`;

const authLinkClass = ({ isActive }) =>
  `nav-site-link nav-site-link--auth ${isActive ? 'is-active' : ''}`;

export default function Navegacion() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isCliente, isAdmin } = useAuth();

  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  const closeNav = () => setExpanded(false);
  const authPath = isCliente ? '/cuenta' : isAdmin ? '/dashboard' : '/login';
  const authLabel = isAuthenticated ? (isCliente ? 'CUENTA' : 'ADMIN') : 'LOGIN';

  return (
    <Navbar
      expand="lg"
      variant="dark"
      bg="black"
      expanded={expanded}
      onToggle={setExpanded}
      className="nav-site sticky-top py-2 py-lg-3"
    >
      <Container className="align-items-lg-center">
        <Navbar.Brand as={NavLink} to="/" className="me-lg-4 py-0" onClick={closeNav}>
          <img src={logo} alt="Logo Gourmet Fire Pit" className="nav-site-logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="landing-navbar-nav" aria-label="Abrir menú" className="border-0 shadow-none" />

        <Navbar.Collapse id="landing-navbar-nav">
          <Nav className="nav-site-menu ms-lg-auto align-items-lg-center gap-lg-1 py-3 py-lg-0">
            <NavLink to="/" end onClick={closeNav} className={linkClass}>
              INICIO
            </NavLink>
            <NavLink to="/menu" onClick={closeNav} className={linkClass}>
              MENÚ
            </NavLink>
            <NavLink to="/bebidas" onClick={closeNav} className={linkClass}>
              BEBIDAS
            </NavLink>
            <NavLink to="/reservas" onClick={closeNav} className={linkClass}>
              RESERVAS
            </NavLink>
            {isCliente && (
              <NavLink to="/mis-reservas" onClick={closeNav} className={linkClass}>
                MIS RESERVAS
              </NavLink>
            )}
            <NavLink to="/nosotros" onClick={closeNav} className={linkClass}>
              NOSOTROS
            </NavLink>
            <NavLink to="/contacto" onClick={closeNav} className={linkClass}>
              CONTÁCTANOS
            </NavLink>
            {!isAuthenticated && (
              <NavLink to="/registro" onClick={closeNav} className={authLinkClass}>
                REGISTRO
              </NavLink>
            )}
            <NavLink to={authPath} onClick={closeNav} className={authLinkClass}>
              {authLabel}
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
