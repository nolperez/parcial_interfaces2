import React from 'react';
import { Link } from 'react-router-dom';

export default function Registro() {
    return (
        <div className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-lg-10 col-xl-8">

                        <div
                            className="rounded-4 p-4 p-md-5"
                            style={{ backgroundColor: '#2b2b2b' }}
                        >
                            <h2 className="text-center text-uppercase fw-bold mb-4 text-secondary">
                                Registro
                            </h2>

                            <form>
                                <div className="row g-4">
                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="nombre" className="form-label text-uppercase fw-bold text-secondary small">
                                                Nombre
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control border-0 text-white rounded-3 form-input-dark"
                                                id="nombre"
                                                placeholder="Ingrese su nombre..."
                                                style={{ backgroundColor: '#666666' }}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="apellidos" className="form-label text-uppercase fw-bold text-secondary small">
                                                Apellidos
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control border-0 text-white rounded-3 form-input-dark"
                                                id="apellidos"
                                                placeholder="Ingrese su apellidos..."
                                                style={{ backgroundColor: '#666666' }}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="fechaNacimiento" className="form-label text-uppercase fw-bold text-secondary small">
                                                Fecha nacimiento
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control border-0 text-white rounded-3 form-input-dark"
                                                id="fechaNacimiento"
                                                placeholder="DD/MM/AAAA"
                                                style={{ backgroundColor: '#666666' }}
                                                required
                                            />
                                        </div>

                                        <div className="mb-0">
                                            <label htmlFor="telefono" className="form-label text-uppercase fw-bold text-secondary small">
                                                Telefono
                                            </label>
                                            <input
                                                type="tel"
                                                className="form-control border-0 text-white rounded-3 form-input-dark"
                                                id="telefono"
                                                placeholder="Ingrese su telefono..."
                                                style={{ backgroundColor: '#666666' }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="direccion" className="form-label text-uppercase fw-bold text-secondary small">
                                                Direccion
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control border-0 text-white rounded-3 form-input-dark"
                                                id="direccion"
                                                placeholder="Direccion"
                                                style={{ backgroundColor: '#666666' }}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="nombreCompleto" className="form-label text-uppercase fw-bold text-secondary small">
                                                Nombre completo
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control border-0 text-white rounded-3 form-input-dark"
                                                id="nombreCompleto"
                                                placeholder="Ingrese su correo..."
                                                style={{ backgroundColor: '#666666' }}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="contrasena" className="form-label text-uppercase fw-bold text-secondary small">
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

                                        <div className="mb-0">
                                            <label htmlFor="confirmarContrasena" className="form-label text-uppercase fw-bold text-secondary small">
                                                Confirme contraseña
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control border-0 text-white rounded-3 form-input-dark"
                                                id="confirmarContrasena"
                                                placeholder="************************"
                                                style={{ backgroundColor: '#666666' }}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex flex-column align-items-center mt-4 pt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-light text-uppercase fw-bold rounded-3 mb-3 w-50"
                                    >
                                        Registrarse
                                    </button>

                                    <Link
                                        to="/login"
                                        className="btn text-uppercase fw-bold rounded-3 text-white border-0 w-50"
                                        style={{ backgroundColor: '#000000' }}
                                    >
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
