import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../logo.png';

const ClienteLayout = ({ children }) => (
    <div className="bg-black text-white min-vh-100 d-flex flex-column">
        <header className="border-bottom border-secondary border-opacity-25">
            <div className="container py-3">
                <div className="d-flex align-items-center justify-content-between">
                    <Link to="/">
                        <img src={logo} alt="Gourmet Fire Pit" style={{ height: '70px' }} />
                    </Link>

                    <div className="d-flex gap-2 gap-md-3">
                        <NavLink
                            to="/mis-reservas"
                            className={({ isActive }) =>
                                `btn rounded-3 px-3 px-md-4 py-2 fw-bold text-uppercase ${isActive ? 'btn-danger' : 'btn-outline-light'}`
                            }
                        >
                            Mis Reservas
                        </NavLink>
                        <NavLink
                            to="/cuenta"
                            className={({ isActive }) =>
                                `btn rounded-3 px-3 px-md-4 py-2 fw-bold text-uppercase ${isActive ? 'btn-danger' : 'btn-outline-light'}`
                            }
                        >
                            Cuenta
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>

        <main className="flex-grow-1 py-4 py-md-5">
            <div className="container">{children}</div>
        </main>

        <footer className="border-top border-secondary border-opacity-25 py-4 mt-auto">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-md-4 text-center text-md-start mb-3 mb-md-0">
                        <img src={logo} alt="Gourmet Fire Pit" style={{ height: '70px' }} />
                    </div>

                    <div className="col-12 col-md-8 text-center text-md-start">
                        <h2 className="fw-bold text-uppercase mb-1">Proximos eventos:</h2>
                        <p className="fs-5 text-uppercase mb-0">
                            Bailes tradicionales y musica en vivo
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
);

const PerfilCliente = () => (
    <div className="row align-items-center g-4 mb-5">
        <div className="col-auto">
            <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                alt="Foto de perfil"
                className="rounded-circle"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
            />
        </div>

        <div className="col">
            <h1 className="text-uppercase fw-bold mb-1">Mi cuenta</h1>
            <p className="text-uppercase mb-1 fs-5">Hola,</p>
            <p className="text-uppercase fw-bold fs-3 mb-0">Folanito Abecedario Silaba</p>
        </div>

        <div className="col-12 col-lg-auto text-lg-end">
            <div className="d-flex flex-column gap-2">
                <button
                    type="button"
                    className="btn text-white border-0 rounded-3 px-4 py-2 fw-bold text-uppercase"
                    style={{ backgroundColor: '#3a3a3a' }}
                >
                    Cambiar contraseña
                </button>
                <Link
                    to="/login"
                    className="btn btn-danger border-0 rounded-3 px-4 py-2 fw-bold text-uppercase"
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
                <h2 className="text-uppercase fw-bold mb-0">Historial de reservas</h2>
                <button
                    type="button"
                    className="btn text-white border-0 rounded-3 px-4 py-2 fw-bold text-uppercase"
                    style={{ backgroundColor: '#3a3a3a' }}
                >
                    Editar datos personales
                </button>
            </div>

            <div className="reservas-tabla rounded-3 overflow-hidden">
                <table className="table reservas-table mb-0 align-middle">
                    <thead>
                        <tr>
                            <th>Fecha y Hora</th>
                            <th>Sucursal</th>
                            <th>Detalle</th>
                            <th>Incitados</th>
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
                                        className="d-inline-block px-3 py-1 rounded-3 fw-bold small"
                                        style={estadoEstilo[reserva.estado]}
                                    >
                                        {reserva.estado}
                                    </span>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-link text-dark p-0 text-decoration-none fw-semibold">
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
