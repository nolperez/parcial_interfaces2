import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-8 col-md-6 col-lg-4">

                        <h2 className="text-center text-uppercase fw-bold mb-4">
                            Iniciar Sesion
                        </h2>

                        <form>
                            <div className="mb-3">
                                <label htmlFor="correo" className="form-label text-uppercase fw-bold">
                                    Correo
                                </label>
                                <input
                                    type="email"
                                    className="form-control bg-secondary text-white border-0"
                                    id="correo"
                                    placeholder="Ingrese su correo..."
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="contrasena" className="form-label text-uppercase fw-bold">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    className="form-control bg-secondary text-white border-0"
                                    id="contrasena"
                                    placeholder="************************"
                                    required
                                />
                            </div>

                            <Link to="/dashboard" className="btn btn-light w-100 text-uppercase fw-bold">
                                Iniciar Sesión
                            </Link>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}