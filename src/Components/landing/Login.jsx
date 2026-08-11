import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import { getApiErrorMessage, validateRequiredForm } from '../../utils/swal';

export default function Login() {
    const [rol, setRol] = useState('cliente');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { success, error: notifyError } = useUI();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || location.state?.from || '';
    const needsAuthForReserva = String(from).includes('/reservas');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateRequiredForm(e.currentTarget)) return;

        setLoading(true);
        try {
            const user = await login({
                email: email.trim(),
                password,
                rol_esperado: rol === 'administrador' ? 'administrador' : 'cliente',
            });
            success('Bienvenido');
            if (user.role === 'cliente') {
                navigate(needsAuthForReserva ? '/reservas' : (from || '/cuenta'), { replace: true });
            } else {
                navigate('/dashboard', { replace: true });
            }
        } catch (err) {
            notifyError(getApiErrorMessage(err, 'No se pudo iniciar sesión'));
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = { backgroundColor: '#333333' };

    return (
        <div className="bg-black text-white min-vh-100 py-4">
            <div className="row mb-4 g-0">
                <div className="col-12">
                    <img
                        src="https://thumbs.dreamstime.com/b/carnes-la-parrilla-en-barbacoa-vista-panor%C3%A1mica-de-varios-cortes-carne-una-sobre-llamas-vibrantes-parece-estar-bien-marinada-y-385351371.jpg"
                        alt="Parrilla Gourmet Fire Pit"
                        className="page-banner"
                    />
                </div>
            </div>

            <div className="container pb-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-7 col-lg-5">
                        <h2 className="text-uppercase fw-bold mb-4 text-center">Iniciar sesión</h2>

                        {needsAuthForReserva && (
                            <p className="text-center text-secondary mb-3">
                                Para reservar una mesa debes iniciar sesión con tu cuenta de cliente.
                            </p>
                        )}

                        <div className="rounded-4 p-4 auth-panel" style={{ backgroundColor: '#2A2A2A' }}>
                            <div className="d-flex mb-4 rounded-3 overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
                                <button
                                    type="button"
                                    className={`flex-fill border-0 py-2 text-uppercase fw-bold ${
                                        rol === 'cliente' ? 'bg-white text-dark' : 'bg-transparent text-white'
                                    }`}
                                    onClick={() => setRol('cliente')}
                                >
                                    <i className="fa-solid fa-user me-2" aria-hidden="true" />
                                    Cliente
                                </button>
                                <button
                                    type="button"
                                    className={`flex-fill border-0 py-2 text-uppercase fw-bold ${
                                        rol === 'administrador' ? 'bg-white text-dark' : 'bg-transparent text-white'
                                    }`}
                                    onClick={() => setRol('administrador')}
                                >
                                    <i className="fa-solid fa-shield-halved me-2" aria-hidden="true" />
                                    Administrador
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label text-secondary">
                                        <i className="fa-solid fa-envelope me-2" aria-hidden="true" />
                                        Correo
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control border-0 text-white rounded-3"
                                        id="correo"
                                        style={inputStyle}
                                        placeholder="Ingrese su correo..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="contrasena" className="form-label text-secondary">
                                        <i className="fa-solid fa-lock me-2" aria-hidden="true" />
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control border-0 text-white rounded-3"
                                        id="contrasena"
                                        style={inputStyle}
                                        placeholder="****************"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="row g-3">
                                    <div className="col-6">
                                        <Link
                                            to="/registro"
                                            state={location.state}
                                            className="btn w-100 text-white border-0 rounded-3"
                                            style={{ backgroundColor: '#5C2C2C' }}
                                        >
                                            <i className="fa-solid fa-user-plus me-2" aria-hidden="true" />
                                            Registrarse
                                        </Link>
                                    </div>
                                    <div className="col-6">
                                        <button
                                            type="submit"
                                            className="btn btn-light w-100 rounded-3"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <i className="fa-solid fa-spinner fa-spin me-2" aria-hidden="true" />
                                                    Ingresando...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fa-solid fa-right-to-bracket me-2" aria-hidden="true" />
                                                    Entrar
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <p className="small text-secondary mt-4 mb-0">
                                Demo: cliente@gourmet.com / cliente123
                                <br />
                                Admin: admin@gourmet.com / admin123
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
