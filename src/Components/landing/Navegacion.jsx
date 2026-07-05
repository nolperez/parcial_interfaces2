import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../logo.png';

const navBtnClass = (isActive, login = false) => {
  if (login) {
    return `btn w-100 ${isActive ? 'btn-danger' : 'btn-light'} rounded-3 px-3 px-lg-4 py-2 fw-bold`;
  }
  return `btn w-100 ${isActive ? 'btn-danger' : 'btn-outline-light'} rounded-3 px-3 px-lg-4 py-2 fw-bold`;
};

export default function Navegacion() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  const closeNav = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      variant="dark"
      bg="black"
      expanded={expanded}
      onToggle={setExpanded}
      className="landing-navbar py-2 py-lg-3 sticky-top"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="me-0 me-lg-4" onClick={closeNav}>
          <img src={logo} alt="Logo Gourmet Fire Pit" className="landing-logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="landing-navbar-nav" aria-label="Abrir menú" />

        <Navbar.Collapse id="landing-navbar-nav">
          <Nav className="mx-auto gap-2 py-3 py-lg-0 w-100 justify-content-center flex-wrap">
            <Nav.Item className="nav-item-mobile">
              <NavLink to="/" end onClick={closeNav} className={({ isActive }) => navBtnClass(isActive)}>
                INICIO
              </NavLink>
            </Nav.Item>
            <Nav.Item className="nav-item-mobile">
              <NavLink to="/menu" onClick={closeNav} className={({ isActive }) => navBtnClass(isActive)}>
                MENÚ
              </NavLink>
            </Nav.Item>
            <Nav.Item className="nav-item-mobile">
              <NavLink to="/bebidas" onClick={closeNav} className={({ isActive }) => navBtnClass(isActive)}>
                BEBIDAS
              </NavLink>
            </Nav.Item>
            <Nav.Item className="nav-item-mobile">
              <NavLink to="/reservas" onClick={closeNav} className={({ isActive }) => navBtnClass(isActive)}>
                RESERVAS
              </NavLink>
            </Nav.Item>
            <Nav.Item className="nav-item-mobile">
              <NavLink to="/nosotros" onClick={closeNav} className={({ isActive }) => navBtnClass(isActive)}>
                NOSOTROS
              </NavLink>
            </Nav.Item>
            <Nav.Item className="nav-item-mobile">
              <NavLink to="/contacto" onClick={closeNav} className={({ isActive }) => navBtnClass(isActive)}>
                CONTÁCTANOS
              </NavLink>
            </Nav.Item>
            <Nav.Item className="nav-item-mobile">
              <NavLink to="/login" onClick={closeNav} className={({ isActive }) => navBtnClass(isActive, true)}>
                LOGIN
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
