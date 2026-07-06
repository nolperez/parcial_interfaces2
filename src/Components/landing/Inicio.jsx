import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logo.png';
import carne from '../../carne.png';

export default function Inicio() {
    return (
        <div className="bg-black text-white">
            {/* Hero Section */}
            <section
                className="hero-section py-5 position-relative"
                style={{
                    backgroundImage: `url(${carne})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '600px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                {/* Overlay */}
                <div
                    className="position-absolute w-100 h-100"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        top: 0,
                        left: 0
                    }}
                ></div>

                <div className="container position-relative z-2">
                    <div className="row align-items-center justify-content-start">
                        <div className="col-md-6 col-12">
                            {/* // centrar la imagen */}
                            <img src={logo} alt="Gourmet Fire Pit" className="img-fluid d-block mx-auto justify-content-center mb-4" style={{ maxWidth: '500px' }} />
                            <p className="fs-7 text-center mb-1" style={{ color: '#d4580e' }}>SABOR QUE ENCIENDE MOMENTOS</p>
                            <p className="mb-3 text-center text-white" style={{ fontSize: '0.75rem' }}>CARNES PREMIUM - PARRILLA AL FUEGO - EXPERIENCIA UNICA</p>
                            <div className="container">
                                <div className="row row-cols-1 row-cols-md-4 text-center">
                                    <div className="col mb-4">
                                        <div className="p-3">
                                            <div className="fs-4 mb-1" style={{ color: '#d4580e' }}>🔥</div>
                                            <h6 className="fw-bold text-uppercase" style={{ fontSize: '0.85rem' }}>Carnes Premium</h6>
                                            <p className="small text-muted" style={{ fontSize: '0.7rem' }}>Seleccionadas</p>
                                        </div>
                                    </div>
                                    <div className="col mb-4">
                                        <div className="p-3">
                                            <div className="fs-4 mb-1" style={{ color: '#d4580e' }}>🍖</div>
                                            <h6 className="fw-bold text-uppercase" style={{ fontSize: '0.85rem' }}>Parrilla al Fuego</h6>
                                            <p className="small text-muted" style={{ fontSize: '0.7rem' }}>Cocción en vivo</p>
                                        </div>
                                    </div>
                                    <div className="col mb-4">
                                        <div className="p-3">
                                            <div className="fs-4 mb-1" style={{ color: '#d4580e' }}>🏆</div>
                                            <h6 className="fw-bold text-uppercase" style={{ fontSize: '0.85rem' }}>Bebidas Seleccionadas</h6>
                                            <p className="small text-muted" style={{ fontSize: '0.7rem' }}>Premium</p>
                                        </div>
                                    </div>
                                    <div className="col mb-4">
                                        <div className="p-3">
                                            <div className="fs-4 mb-1" style={{ color: '#d4580e' }}>✓</div>
                                            <h6 className="fw-bold text-uppercase" style={{ fontSize: '0.85rem' }}>Experiencia Garantizada</h6>
                                            <p className="small text-muted" style={{ fontSize: '0.7rem' }}>A la Parrilla</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-3" style={{ backgroundColor: '#4b0505' }}>
                <div className="container">
                    <div className="row align-items-center justify-content-center text-center">
                        <h2 className="fw-bold text-white mb-0">PROMOCIONES</h2>
                    </div>
                </div>
            </section>
            {/* Promotions Section */}
            <section className="py-5">
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {/* Combo Parrillero */}
                        <div className="col">
                            <div className="card border-0 h-100 overflow-hidden" style={{ borderTop: '3px solid #d4580e', backgroundColor: '#0a0a0a', borderRadius: '12px' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=250&fit=crop"
                                    alt="Combo Parrillero"
                                    className="card-img-top"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold text-uppercase text-white">Combo Parrillero</h5>
                                    <p className="small text-white mb-2">PARA 2 PERSONAS</p>
                                    <p className="fs-4 fw-bold mb-3" style={{ color: '#d4580e' }}>30% <span className="text-white" style={{ fontSize: '0.7em' }}>DE DESCUENTO</span></p>
                                    <ul className="list-unstyled small text-white mb-3">
                                        <li>2 Carnes especiales</li>
                                        <li>2 Acompañamientos</li>
                                        <li>Ensalada fresca</li>
                                        <li>2 Bebidas</li>
                                    </ul>
                                    <p className="small fw-bold text-white">AHORA A/ $95.90</p>
                                </div>
                            </div>
                            <div className="container text-center d-flex align-items-center justify-content-center py-3">
                                <Link to="/reservas" className="btn btn-light d-flex align-items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                                    </svg>
                                    <span>Reservar ahora</span>
                                </Link>
                            </div>
                        </div>

                        {/* Happy Hour */}
                        <div className="col">
                            <div className="card border-0 h-100 overflow-hidden" style={{ borderTop: '3px solid #d4580e', backgroundColor: '#0a0a0a', borderRadius: '12px' }}>
                                <img
                                    src="https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/10/01/5e997e89af554.jpeg"
                                    alt="Happy Hour"
                                    className="card-img-top"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold text-uppercase text-white">Happy Hour</h5>
                                    <p className="small text-white mb-2">4:00 PM - 7:00 PM</p>
                                    <p className="fs-5 fw-bold mb-3" style={{ color: '#d4580e' }}>-15% <span className="text-white" style={{ fontSize: '0.7em' }}>DE DESCUENTO</span></p>
                                    <ul className="list-unstyled small text-white mb-3">
                                        <li>2+1 en bebidas seleccionadas</li>
                                        <li>Tabla de quesos</li>
                                        <li>Picadas especiales</li>
                                        <li>Descuento en carnes</li>
                                    </ul>
                                    <p className="small fw-bold text-white">TODOS LOS DÍAS</p>
                                </div>
                            </div>
                            <div className="container text-center d-flex align-items-center justify-content-center py-3">
                                <Link to="/reservas" className="btn btn-light d-flex align-items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                                    </svg>
                                    <span>Reservar ahora</span>
                                </Link>
                            </div>
                        </div>

                        {/* Martes de Parrilla */}
                        <div className="col">
                            <div className="card border-0 h-100 overflow-hidden" style={{ borderTop: '3px solid #d4580e', backgroundColor: '#0a0a0a', borderRadius: '12px' }}>
                                <img
                                    src="https://gourmet.iprospect.cl/wp-content/uploads/2020/08/foto-portada.jpg"
                                    alt="Martes de Parrilla"
                                    className="card-img-top"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold text-uppercase text-white">Martes de Parrilla</h5>
                                    <p className="small text-white mb-2">TODOS LOS MARTES</p>
                                    <p className="fs-4 fw-bold mb-3" style={{ color: '#d4580e' }}>25% <span className="text-white" style={{ fontSize: '0.7em' }}>DE DESCUENTO</span></p>
                                    <ul className="list-unstyled small text-white mb-3">
                                        <li>En carnes seleccionados</li>
                                        <li>Tabla especial</li>
                                        <li>Bebida cortesia</li>
                                        <li>Postre gourmet</li>
                                    </ul>
                                    <p className="small fw-bold text-white">EN CORTES SELECCIONADOS</p>
                                </div>
                            </div>
                            <div className="container text-center d-flex align-items-center justify-content-center py-3">
                                <Link to="/reservas" className="btn btn-light d-flex align-items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                                    </svg>
                                    <span>Reservar ahora</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
