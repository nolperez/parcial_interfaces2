import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../../logo.png';

const ClienteLayout = ({ children }) => {
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setExpanded(false);
    }, [location.pathname]);

    const closeNav = () => setExpanded(false);

    return (
    <div className="bg-black text-white min-vh-100 d-flex flex-column">
        <Navbar
            expand="md"
            variant="dark"
            bg="black"
            expanded={expanded}
            onToggle={setExpanded}
            className="cliente-navbar border-bottom border-secondary border-opacity-25 py-2 py-md-3"
        >
            <Container>
                <Navbar.Brand as={Link} to="/" onClick={closeNav}>
                    <img src={logo} alt="Gourmet Fire Pit" className="landing-logo" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="cliente-navbar" aria-label="Abrir menú" />

                <Navbar.Collapse id="cliente-navbar" className="justify-content-end">
                    <Nav className="cliente-header-actions gap-2 py-3 py-md-0 w-100 w-md-auto justify-content-md-end">
                        <Nav.Item className="flex-fill flex-md-grow-0">
                            <NavLink
                                to="/mis-reservas"
                                onClick={closeNav}
                                className={({ isActive }) =>
                                    `btn w-100 rounded-3 px-3 px-md-4 py-2 fw-bold text-uppercase ${isActive ? 'btn-danger' : 'btn-outline-light'}`
                                }
                            >
                                Mis Reservas
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item className="flex-fill flex-md-grow-0">
                            <NavLink
                                to="/cuenta"
                                onClick={closeNav}
                                className={({ isActive }) =>
                                    `btn w-100 rounded-3 px-3 px-md-4 py-2 fw-bold text-uppercase ${isActive ? 'btn-danger' : 'btn-outline-light'}`
                                }
                            >
                                Cuenta
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <main className="flex-grow-1 py-4 py-md-5">
            <Container>{children}</Container>
        </main>

        <footer className="border-top border-secondary border-opacity-25 py-4 mt-auto landing-footer">
            <Container>
                <div className="row align-items-center g-3">
                    <div className="col-12 col-md-4 text-center text-md-start">
                        <img src={logo} alt="Gourmet Fire Pit" className="landing-logo-footer" />
                    </div>

                    <div className="col-12 col-md-8 text-center text-md-start">
                        <h2 className="fw-bold text-uppercase mb-1 fs-5 fs-md-4">Proximos eventos:</h2>
                        <p className="text-uppercase mb-0 fs-6 fs-md-5">
                            Bailes tradicionales y musica en vivo
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    </div>
    );
};

const PerfilCliente = () => (
    <div className="row align-items-center g-4 mb-4 mb-md-5">
        <div className="col-12 col-sm-auto text-center text-sm-start">
            <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                alt="Foto de perfil"
                className="rounded-circle cliente-perfil-foto"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
            />
        </div>

        <div className="col-12 col-sm text-center text-sm-start">
            <h1 className="text-uppercase fw-bold mb-1 h3 h-md-2">Mi cuenta</h1>
            <p className="text-uppercase mb-1">Hola,</p>
            <p className="text-uppercase fw-bold mb-0 cliente-perfil-nombre fs-4">
                Folanito Abecedario Silaba
            </p>
        </div>

        <div className="col-12 col-lg-auto">
            <div className="d-flex flex-column flex-sm-row flex-lg-column gap-2">
                <button
                    type="button"
                    className="btn text-white border-0 rounded-3 px-4 py-2 fw-bold text-uppercase w-100"
                    style={{ backgroundColor: '#3a3a3a' }}
                >
                    Cambiar contraseña
                </button>
                <Link
                    to="/login"
                    className="btn btn-danger border-0 rounded-3 px-4 py-2 fw-bold text-uppercase w-100"
                >
                    Cerrar sesión
                </Link>
            </div>
        </div>
    </div>
);

const estadoEstilo = {
    Pendiente: { backgroundColor: '#c45c00', color: '#fff' },
    Confirmada: { backgroundColor: '#1a7a1a', color: '#fff' },
    Cancelada: { backgroundColor: '#8b1a1a', color: '#fff' },
};

const reservasData = [
    { fecha: '02/07/26, 20:00', sucursal: 'Sucursal centro', detalle: 'Plarrilla premium', invitados: 5, estado: 'Pendiente' },
    { fecha: '05/02/26, 13:30', sucursal: 'Sucursal centro', detalle: 'Degustacion', invitados: 2, estado: 'Confirmada' },
    { fecha: '15/01/26, 21:00', sucursal: 'Sucursal centro', detalle: 'Rodizio de autor', invitados: 4, estado: 'Confirmada' },
    { fecha: '28/12/25, 19:30', sucursal: 'Sucursal centro', detalle: 'Plarrilla premium', invitados: 3, estado: 'Cancelada' },
    { fecha: '10/11/25, 18:00', sucursal: 'Sucursal centro', detalle: 'Degustacion', invitados: 6, estado: 'Pendiente' },
];

export default function MisReservas() {
    return (
        <ClienteLayout>
            <PerfilCliente />

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <h2 className="text-uppercase fw-bold mb-0 h4 h-md-3">Historial de reservas</h2>
                <button
                    type="button"
                    className="btn text-white border-0 rounded-3 px-4 py-2 fw-bold text-uppercase w-100 w-md-auto"
                    style={{ backgroundColor: '#3a3a3a' }}
                >
                    Editar datos personales
                </button>
            </div>

            <div className="table-responsive reservas-tabla rounded-3">
                <table className="table reservas-table mb-0 align-middle">
                    <thead>
                        <tr>
                            <th>Fecha y Hora</th>
                            <th>Sucursal</th>
                            <th>Detalle</th>
                            <th>Comensales</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservasData.map((reserva, index) => (
                            <tr key={index}>
                                <td>{reserva.fecha}</td>
                                <td>{reserva.sucursal}</td>
                                <td>{reserva.detalle}</td>
                                <td>{reserva.invitados}</td>
                                <td>
                                    <span
                                        className="d-inline-block px-2 px-md-3 py-1 rounded-3 fw-bold small"
                                        style={estadoEstilo[reserva.estado]}
                                    >
                                        {reserva.estado}
                                    </span>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-link text-dark p-0 text-decoration-none fw-semibold small">
                                        [Ver detalles]
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ClienteLayout>
    );
}

export { ClienteLayout, PerfilCliente };
