import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Form, Button } from 'react-bootstrap';
import logo from '../../logo.png';
import api from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import {
    swalApiError,
    swalConfirm,
    swalSuccess,
    swalWarning,
    validateRequiredFields,
    validateRequiredForm,
} from '../../utils/swal';

export const ClienteLayout = ({ children }) => {
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setExpanded(false);
    }, [location.pathname]);

    const closeNav = () => setExpanded(false);

    return (
        <div className="bg-black text-white min-vh-100 d-flex flex-column">
            <Navbar expand="md" variant="dark" bg="black" expanded={expanded} onToggle={setExpanded} className="border-bottom border-secondary border-opacity-25 py-2 py-md-3">
                <Container>
                    <Navbar.Brand as={Link} to="/" onClick={closeNav}>
                        <img src={logo} alt="Gourmet Fire Pit" className="img-fluid" style={{ height: 56 }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="cliente-navbar" aria-label="Abrir menú" />
                    <Navbar.Collapse id="cliente-navbar" className="justify-content-end">
                        <Nav className="gap-2 py-3 py-md-0 w-100 justify-content-md-end">
                            <Nav.Item className="flex-fill flex-md-grow-0">
                                <NavLink to="/mis-reservas" onClick={closeNav} className={({ isActive }) => `btn w-100 rounded-3 px-3 px-md-4 py-2 fw-bold text-uppercase ${isActive ? 'btn-danger' : 'btn-outline-light'}`}>
                                    Mis Reservas
                                </NavLink>
                            </Nav.Item>
                            <Nav.Item className="flex-fill flex-md-grow-0">
                                <NavLink to="/cuenta" onClick={closeNav} className={({ isActive }) => `btn w-100 rounded-3 px-3 px-md-4 py-2 fw-bold text-uppercase ${isActive ? 'btn-danger' : 'btn-outline-light'}`}>
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
            <footer className="border-top border-secondary border-opacity-25 py-4 mt-auto">
                <Container>
                    <div className="row align-items-center g-3">
                        <div className="col-12 col-md-4 text-center text-md-start">
                            <img src={logo} alt="Gourmet Fire Pit" className="img-fluid" style={{ height: 48 }} />
                        </div>
                        <div className="col-12 col-md-8 text-center text-md-start">
                            <h2 className="fw-bold text-uppercase mb-1 fs-5 fs-md-4">Proximos eventos:</h2>
                            <p className="text-uppercase mb-0 fs-6 fs-md-5">Bailes tradicionales y musica en vivo</p>
                        </div>
                    </div>
                </Container>
            </footer>
        </div>
    );
};

export const PerfilCliente = ({ onChangePassword }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const nombre = user?.nombre_completo || `${user?.name || ''} ${user?.apellidos || ''}`.trim();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <>
            <div className="row align-items-center g-4 mb-4">
                <div className="col-12 col-sm-auto text-center text-sm-start">
                    <div
                        className="rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold"
                        style={{ width: 120, height: 120, backgroundColor: '#4b0505', fontSize: '2rem' }}
                    >
                        {(user?.name || 'C').charAt(0).toUpperCase()}
                    </div>
                </div>
                <div className="col-12 col-sm text-center text-sm-start">
                    <h1 className="text-uppercase fw-bold mb-1 h3">Mi cuenta</h1>
                    <p className="text-uppercase mb-1 text-secondary">Cliente registrado</p>
                    <p className="text-uppercase fw-bold mb-0 fs-4">{nombre || 'Cliente'}</p>
                    <p className="mb-0 text-secondary">{user?.email}</p>
                </div>
                <div className="col-12 col-lg-auto">
                    <div className="d-flex flex-column flex-sm-row flex-lg-column gap-2">
                        <button type="button" className="btn text-white border-0 rounded-3 px-4 py-2 fw-bold text-uppercase w-100" style={{ backgroundColor: '#3a3a3a' }} onClick={onChangePassword}>
                            Cambiar contraseña
                        </button>
                        <button type="button" className="btn btn-danger border-0 rounded-3 px-4 py-2 fw-bold text-uppercase w-100" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>

            <div className="row g-3 mb-4 mb-md-5">
                <div className="col-md-6 col-lg-4"><DataField label="Nombre completo" value={nombre} /></div>
                <div className="col-md-6 col-lg-4"><DataField label="Documento" value={`${user?.tipo_documento || '—'} ${user?.numero_documento || ''}`.trim()} /></div>
                <div className="col-md-6 col-lg-4"><DataField label="Correo" value={user?.email} /></div>
                <div className="col-md-6 col-lg-4"><DataField label="Teléfono" value={user?.telefono} /></div>
                <div className="col-md-6 col-lg-4"><DataField label="Fecha de nacimiento" value={formatFecha(user?.fecha_nacimiento)} /></div>
                <div className="col-md-6 col-lg-4"><DataField label="Género" value={user?.genero} /></div>
                <div className="col-md-6 col-lg-4"><DataField label="Ciudad" value={user?.ciudad} /></div>
                <div className="col-md-6 col-lg-4"><DataField label="Dirección" value={user?.direccion} /></div>
                <div className="col-md-6 col-lg-4"><DataField label="Preferencia alimentaria" value={user?.preferencias_alimentarias} /></div>
                <div className="col-md-6 col-lg-4"><DataField label="Preferencia de asiento" value={user?.preferencias_asiento} /></div>
                <div className="col-md-6 col-lg-4"><DataField label="Métodos de pago" value={user?.metodos_pago} /></div>
                <div className="col-12">
                    <div className="bg-dark rounded-3 p-3">
                        <h6 className="text-uppercase fw-bold mb-2" style={{ color: '#d4580e' }}>Métodos vinculados</h6>
                        {Array.isArray(user?.metodos_pago_vinculados) && user.metodos_pago_vinculados.length > 0 ? (
                            <ul className="mb-0">
                                {user.metodos_pago_vinculados.map((m) => (
                                    <li key={m.id}>{m.nombre} {m.pivot?.detalle ? `— ${m.pivot.detalle}` : ''}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-secondary mb-0 small">Puedes registrar métodos de pago en tu perfil o al crear una reserva.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const DataField = ({ label, value }) => (
    <div className="mb-2">
        <div className="bg-black text-white px-3 py-2 text-uppercase fw-bold small">{label}</div>
        <div className="px-3 py-2 text-dark" style={{ backgroundColor: '#c4c4c4' }}>{value || '—'}</div>
    </div>
);

const formatFecha = (value) => {
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('es-PE');
};

export default function MisReservas() {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const load = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/mis-reservas');
            setReservas(data || []);
        } catch (err) {
            swalApiError(err, 'No se pudieron cargar tus reservas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const cancelar = async (id) => {
        const ok = await swalConfirm('La reserva pasará a estado cancelada.', '¿Cancelar esta reserva?');
        if (!ok) return;
        try {
            await api.put(`/mis-reservas/${id}/cancelar`);
            swalSuccess('Reserva cancelada');
            await load();
        } catch (err) {
            swalApiError(err, 'No se pudo cancelar la reserva');
        }
    };

    const estadoEstilo = {
        pendiente: { backgroundColor: '#c45c00', color: '#fff' },
        confirmada: { backgroundColor: '#1a7a1a', color: '#fff' },
        cancelada: { backgroundColor: '#8b1a1a', color: '#fff' },
        rechazada: { backgroundColor: '#8b1a1a', color: '#fff' },
    };

    const activas = reservas.filter((r) => r.estado === 'pendiente' || r.estado === 'confirmada');
    const historial = reservas.filter((r) => r.estado !== 'pendiente' && r.estado !== 'confirmada');

    const ReservaCard = ({ r }) => {
        const platos = (r.platos || []).map((p) => `${p.nombre_item} ×${p.cantidad}`).join(', ')
            || r.plato
            || '—';
        const fecha = new Date(r.fecha_hora);
        return (
            <div className="rounded-3 p-3 p-md-4 h-100" style={{ backgroundColor: '#1f1f1f', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                    <div>
                        <p className="text-uppercase small text-secondary mb-1">Reserva #{r.id}</p>
                        <h3 className="h5 fw-bold text-uppercase mb-0">
                            {fecha.toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </h3>
                        <p className="mb-0 mt-1" style={{ color: '#d4580e' }}>
                            <i className="fa-solid fa-clock me-2" aria-hidden="true" />
                            {fecha.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                    <span className="badge rounded-pill px-3 py-2 text-uppercase" style={estadoEstilo[r.estado] || {}}>
                        {r.estado}
                    </span>
                </div>
                <div className="row g-2 small">
                    <div className="col-sm-6">
                        <span className="text-secondary d-block">Mesa</span>
                        <strong>{r.mesa?.nombremessa || '—'} {r.mesa?.ubicacionmesa ? `· ${r.mesa.ubicacionmesa}` : ''}</strong>
                    </div>
                    <div className="col-sm-6">
                        <span className="text-secondary d-block">Comensales</span>
                        <strong>{r.comensales} {r.asientos ? `(${r.asientos} asientos)` : ''}</strong>
                    </div>
                    <div className="col-sm-6">
                        <span className="text-secondary d-block">Sucursal</span>
                        <strong>{r.sucursal || 'Gourmet Fire Pit'}</strong>
                    </div>
                    <div className="col-sm-6">
                        <span className="text-secondary d-block">Pago</span>
                        <strong>{r.metodo_pago?.nombre || r.metodoPago?.nombre || '—'}</strong>
                    </div>
                    <div className="col-12">
                        <span className="text-secondary d-block">Pedido</span>
                        <strong>{platos}</strong>
                    </div>
                    {r.descripcion && (
                        <div className="col-12">
                            <span className="text-secondary d-block">Observaciones</span>
                            <span>{r.descripcion}</span>
                        </div>
                    )}
                    <div className="col-12 d-flex justify-content-between align-items-center mt-2 pt-2 border-top border-secondary border-opacity-25">
                        <strong>Total: S/ {Number(r.total_estimado || 0).toFixed(2)}</strong>
                        {(r.estado === 'pendiente' || r.estado === 'confirmada') && (
                            <button type="button" className="btn btn-sm btn-outline-light" onClick={() => cancelar(r.id)}>
                                Cancelar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <ClienteLayout>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3 mb-4">
                <div>
                    <p className="text-uppercase small text-secondary mb-1">Cliente</p>
                    <h1 className="text-uppercase fw-bold mb-1 landing-page-title">Mis reservas</h1>
                    <p className="text-secondary mb-0">
                        Hola {user?.name || 'cliente'}, aquí ves tus reservaciones activas e historial.
                    </p>
                </div>
                <div className="d-flex flex-column flex-sm-row gap-2 mis-reservas-actions">
                    <Link to="/cuenta" className="btn btn-outline-light rounded-3 px-4 py-2 fw-bold text-uppercase">
                        Mi cuenta
                    </Link>
                    <Link to="/reservas" className="btn border-0 rounded-3 px-4 py-2 fw-bold text-uppercase text-white" style={{ backgroundColor: '#d4580e' }}>
                        Nueva reserva
                    </Link>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5 text-secondary">Cargando tus reservas...</div>
            ) : (
                <>
                    <h2 className="text-uppercase fw-bold h5 mb-3" style={{ color: '#d4580e' }}>
                        Activas ({activas.length})
                    </h2>
                    {activas.length === 0 ? (
                        <div className="rounded-3 p-4 mb-4 text-secondary" style={{ backgroundColor: '#1f1f1f' }}>
                            No tienes reservas activas. Reserva una mesa cuando quieras.
                        </div>
                    ) : (
                        <div className="row g-3 mb-5">
                            {activas.map((r) => (
                                <div className="col-md-6" key={r.id}>
                                    <ReservaCard r={r} />
                                </div>
                            ))}
                        </div>
                    )}

                    <h2 className="text-uppercase fw-bold h5 mb-3">Historial ({historial.length})</h2>
                    {historial.length === 0 ? (
                        <div className="rounded-3 p-4 text-secondary" style={{ backgroundColor: '#1f1f1f' }}>
                            Aún no hay reservas finalizadas o canceladas.
                        </div>
                    ) : (
                        <div className="row g-3">
                            {historial.map((r) => (
                                <div className="col-md-6" key={r.id}>
                                    <ReservaCard r={r} />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </ClienteLayout>
    );
}

export function MiCuentaPage() {
    const { user, updateProfile, changePassword } = useAuth();
    const [editing, setEditing] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const [form, setForm] = useState({
        name: user?.name || '',
        apellidos: user?.apellidos || '',
        tipo_documento: user?.tipo_documento || 'DNI',
        numero_documento: user?.numero_documento || '',
        telefono: user?.telefono || '',
        direccion: user?.direccion || '',
        ciudad: user?.ciudad || '',
        fecha_nacimiento: user?.fecha_nacimiento ? String(user.fecha_nacimiento).slice(0, 10) : '',
        genero: user?.genero || '',
        preferencias_alimentarias: user?.preferencias_alimentarias || '',
        preferencias_asiento: user?.preferencias_asiento || '',
        metodos_pago: user?.metodos_pago || '',
    });
    const [pwd, setPwd] = useState({ password_actual: '', password: '', password_confirmation: '' });

    useEffect(() => {
        setForm({
            name: user?.name || '',
            apellidos: user?.apellidos || '',
            tipo_documento: user?.tipo_documento || 'DNI',
            numero_documento: user?.numero_documento || '',
            telefono: user?.telefono || '',
            direccion: user?.direccion || '',
            ciudad: user?.ciudad || '',
            fecha_nacimiento: user?.fecha_nacimiento ? String(user.fecha_nacimiento).slice(0, 10) : '',
            genero: user?.genero || '',
            preferencias_alimentarias: user?.preferencias_alimentarias || '',
            preferencias_asiento: user?.preferencias_asiento || '',
            metodos_pago: user?.metodos_pago || '',
        });
    }, [user]);

    const saveProfile = async () => {
        if (!validateRequiredFields(form, ['name'], { name: 'Nombre' })) return;
        try {
            await updateProfile(form);
            setEditing(false);
            swalSuccess('Datos actualizados');
        } catch (err) {
            swalApiError(err, 'No se pudo actualizar');
        }
    };

    const savePassword = async (e) => {
        e.preventDefault();
        if (!validateRequiredForm(e.currentTarget)) return;
        if (pwd.password !== pwd.password_confirmation) {
            swalWarning('La confirmación no coincide', 'Validación');
            return;
        }
        try {
            await changePassword(pwd);
            setPasswordModal(false);
            setPwd({ password_actual: '', password: '', password_confirmation: '' });
            swalSuccess('Contraseña actualizada');
        } catch (err) {
            swalApiError(err, 'Error al cambiar contraseña');
        }
    };

    return (
        <ClienteLayout>
            <PerfilCliente onChangePassword={() => setPasswordModal(true)} />
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <h2 className="text-uppercase fw-bold mb-0">Gestion de cuenta</h2>
                <button type="button" className="btn text-white border-0 rounded-3 px-4 py-2 fw-bold text-uppercase" style={{ backgroundColor: '#3a3a3a' }} onClick={() => (editing ? saveProfile() : setEditing(true))}>
                    {editing ? 'Guardar cambios' : 'Editar datos personales'}
                </button>
            </div>
            <div className="rounded-3 p-3 p-md-4" style={{ backgroundColor: '#2b2b2b' }}>
                {!editing ? (
                    <div className="row g-4">
                        <div className="col-12 col-lg-6">
                            <DataField label="Nombre Completo" value={`${user?.name || ''} ${user?.apellidos || ''}`.trim()} />
                            <DataField label="Fecha Nacimiento" value={formatFecha(user?.fecha_nacimiento)} />
                            <DataField label="Correo Electronico" value={user?.email} />
                            <DataField label="Telefono" value={user?.telefono} />
                            <DataField label="Direccion" value={user?.direccion} />
                        </div>
                        <div className="col-12 col-lg-6">
                            <DataField label="Metodos de Pago" value={<span style={{ whiteSpace: 'pre-line' }}>{user?.metodos_pago || '—'}</span>} />
                            <DataField label="Preferencias Alimentarias" value={user?.preferencias_alimentarias} />
                            <DataField label="Preferencias de Asientos" value={user?.preferencias_asiento} />
                        </div>
                    </div>
                ) : (
                    <div className="row g-3">
                        {[
                            ['name', 'Ingrese su nombre...'],
                            ['apellidos', 'Ingrese sus apellidos...'],
                            ['telefono', 'Ingrese su teléfono...'],
                            ['direccion', 'Ingrese su dirección...'],
                            ['ciudad', 'Ingrese su ciudad...'],
                            ['numero_documento', 'Ingrese su documento...'],
                            ['preferencias_alimentarias', 'Ej: Sin gluten, vegetariano...'],
                            ['preferencias_asiento', 'Ej: Cerca a la ventana...'],
                        ].map(([key, placeholder]) => (
                            <div className="col-md-6" key={key}>
                                <label className="form-label text-uppercase small">{key.replaceAll('_', ' ')}</label>
                                <input
                                    className="form-control"
                                    value={form[key] || ''}
                                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                    placeholder={placeholder}
                                    required={key === 'name'}
                                />
                            </div>
                        ))}
                        <div className="col-md-6">
                            <label className="form-label text-uppercase small">Tipo documento</label>
                            <select className="form-select" value={form.tipo_documento || 'DNI'} onChange={(e) => setForm({ ...form, tipo_documento: e.target.value })}>
                                <option value="DNI">DNI</option>
                                <option value="CE">CE</option>
                                <option value="PASAPORTE">Pasaporte</option>
                                <option value="RUC">RUC</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-uppercase small">Género</label>
                            <select className="form-select" value={form.genero || ''} onChange={(e) => setForm({ ...form, genero: e.target.value })}>
                                <option value="">—</option>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                                <option value="otro">Otro</option>
                                <option value="prefiero_no_decir">Prefiero no decir</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-uppercase small">Fecha nacimiento</label>
                            <input type="date" className="form-control" value={form.fecha_nacimiento || ''} onChange={(e) => setForm({ ...form, fecha_nacimiento: e.target.value })} />
                        </div>
                        <div className="col-12">
                            <label className="form-label text-uppercase small">Metodos de pago</label>
                            <textarea className="form-control" rows={3} value={form.metodos_pago || ''} onChange={(e) => setForm({ ...form, metodos_pago: e.target.value })} placeholder="Ej: VISA ****1234, Yape..." />
                        </div>
                    </div>
                )}
            </div>

            <Modal show={passwordModal} onHide={() => setPasswordModal(false)} centered>
                <Form onSubmit={savePassword} noValidate>
                    <Modal.Header closeButton><Modal.Title>Cambiar contraseña</Modal.Title></Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña actual</Form.Label>
                            <Form.Control type="password" value={pwd.password_actual} onChange={(e) => setPwd({ ...pwd, password_actual: e.target.value })} placeholder="****************" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nueva contraseña</Form.Label>
                            <Form.Control type="password" value={pwd.password} onChange={(e) => setPwd({ ...pwd, password: e.target.value })} placeholder="****************" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirmar</Form.Label>
                            <Form.Control type="password" value={pwd.password_confirmation} onChange={(e) => setPwd({ ...pwd, password_confirmation: e.target.value })} placeholder="****************" required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setPasswordModal(false)}>Cancelar</Button>
                        <Button type="submit" variant="danger">Guardar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </ClienteLayout>
    );
}
