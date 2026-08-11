import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import { getApiErrorMessage, swalWarning, validateRequiredForm } from '../../utils/swal';

export default function Registro() {
    const { register } = useAuth();
    const { success, error: notifyError } = useUI();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || location.state?.from || '';
    const goToReservas = String(from).includes('/reservas');
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        apellidos: '',
        fecha_nacimiento: '',
        telefono: '',
        direccion: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateRequiredForm(e.currentTarget)) return;
        if (form.password !== form.password_confirmation) {
            swalWarning('Las contraseñas no coinciden', 'Validación');
            return;
        }
        setLoading(true);
        try {
            await register(form);
            success('Registro exitoso');
            navigate(goToReservas ? '/reservas' : '/cuenta', { replace: true });
        } catch (err) {
            notifyError(getApiErrorMessage(err, 'No se pudo registrar'));
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = { backgroundColor: '#666666' };

    return (
        <div className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center py-4 py-md-5 px-2">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-11 col-lg-10 col-xl-8">
                        <div className="rounded-4 p-3 p-md-5 auth-panel" style={{ backgroundColor: '#2b2b2b' }}>
                            <h2 className="text-center text-uppercase fw-bold mb-4 text-secondary landing-page-title">
                                Registro
                            </h2>

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="row g-4">
                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="nombre" className="form-label text-uppercase fw-bold text-secondary small">Nombre</label>
                                            <input type="text" className="form-control border-0 text-white rounded-3" id="nombre" style={inputStyle} value={form.name} onChange={set('name')} placeholder="Ingrese su nombre..." required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="apellidos" className="form-label text-uppercase fw-bold text-secondary small">Apellidos</label>
                                            <input type="text" className="form-control border-0 text-white rounded-3" id="apellidos" style={inputStyle} value={form.apellidos} onChange={set('apellidos')} placeholder="Ingrese sus apellidos..." required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="fechaNacimiento" className="form-label text-uppercase fw-bold text-secondary small">Fecha nacimiento</label>
                                            <input type="date" className="form-control border-0 text-white rounded-3" id="fechaNacimiento" style={inputStyle} value={form.fecha_nacimiento} onChange={set('fecha_nacimiento')} />
                                        </div>
                                        <div className="mb-0">
                                            <label htmlFor="telefono" className="form-label text-uppercase fw-bold text-secondary small">Telefono</label>
                                            <input type="tel" className="form-control border-0 text-white rounded-3" id="telefono" style={inputStyle} value={form.telefono} onChange={set('telefono')} placeholder="Ingrese su teléfono..." required />
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="direccion" className="form-label text-uppercase fw-bold text-secondary small">Direccion</label>
                                            <input type="text" className="form-control border-0 text-white rounded-3" id="direccion" style={inputStyle} value={form.direccion} onChange={set('direccion')} placeholder="Ingrese su dirección..." required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label text-uppercase fw-bold text-secondary small">Correo</label>
                                            <input type="email" className="form-control border-0 text-white rounded-3" id="email" style={inputStyle} value={form.email} onChange={set('email')} placeholder="Ingrese su correo..." required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="contrasena" className="form-label text-uppercase fw-bold text-secondary small">Contraseña</label>
                                            <input type="password" className="form-control border-0 text-white rounded-3" id="contrasena" style={inputStyle} value={form.password} onChange={set('password')} placeholder="****************" required />
                                        </div>
                                        <div className="mb-0">
                                            <label htmlFor="confirmarContrasena" className="form-label text-uppercase fw-bold text-secondary small">Confirme contraseña</label>
                                            <input type="password" className="form-control border-0 text-white rounded-3" id="confirmarContrasena" style={inputStyle} value={form.password_confirmation} onChange={set('password_confirmation')} placeholder="****************" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex flex-column align-items-center mt-4 pt-2">
                                    <button type="submit" className="btn btn-light text-uppercase fw-bold rounded-3 mb-3 w-50" disabled={loading}>
                                        {loading ? 'Registrando...' : 'Registrarse'}
                                    </button>
                                    <Link to="/login" className="btn text-uppercase fw-bold rounded-3 text-white border-0 w-50" style={{ backgroundColor: '#000000' }}>
                                        Iniciar Sesion
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
