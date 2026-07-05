import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    const [rol, setRol] = useState('cliente');

    return (
        <div className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">

                        <div
                            className="rounded-4 p-4 p-md-5"
                            style={{ backgroundColor: '#2a2a2a' }}
                        >
                            <div
                                className="d-flex rounded-3 overflow-hidden mb-4"
                                style={{ backgroundColor: '#1a1a1a' }}
                            >
                                <button
                                    type="button"
                                    className={`flex-fill py-2 border-0 text-uppercase fw-bold ${rol === 'cliente' ? 'bg-white text-dark' : 'bg-transparent text-white'}`}
                                    onClick={() => setRol('cliente')}
                                >
                                    Cliente
                                </button>
                                <button
                                    type="button"
                                    className={`flex-fill py-2 border-0 text-uppercase fw-bold ${rol === 'administrador' ? 'bg-white text-dark' : 'bg-transparent text-white'}`}
                                    onClick={() => setRol('administrador')}
                                >
                                    Administrador
                                </button>
                            </div>

                            <h2 className="text-center text-uppercase fw-bold mb-4 text-secondary">
                                Iniciar Sesion
                            </h2>

                            <form>
                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label text-uppercase fw-bold text-secondary">
                                        Correo
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control border-0 text-white rounded-3 form-input-dark"
                                        id="correo"
                                        placeholder="Ingrese su correo..."
                                        style={{ backgroundColor: '#666666' }}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="contrasena" className="form-label text-uppercase fw-bold text-secondary">
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control border-0 text-white rounded-3 form-input-dark"
                                        id="contrasena"
                                        placeholder="************************"
                                        style={{ backgroundColor: '#666666' }}
                                        required
                                    />
                                </div>

                                <Link
                                    to={rol === 'administrador' ? '/dashboard' : '/cuenta'}
                                    className="btn btn-light w-100 text-uppercase fw-bold rounded-3 mb-3"
                                >
                                    Iniciar Sesión
                                </Link>

                                <Link
                                    to="/registro"
                                    className="btn w-100 text-uppercase fw-bold rounded-3 text-white border-0"
                                    style={{ backgroundColor: '#000000' }}
                                >
                                    Registrarse
                                </Link>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
