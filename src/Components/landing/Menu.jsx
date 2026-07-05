import React from 'react'
import { Link } from 'react-router-dom'

export default function Menu() {
    return (
        <div className="bg-black text-white min-vh-100 py-3">
            <div className="container">

                <div className="text-center mb-4">
                    <div className="d-inline-block px-4 py-2">
                        <h1 className="text-white fw-bold text-uppercase mb-0">
                            Gourmet Fire Pit
                        </h1>
                        <p className="text-danger text-uppercase fw-bold mb-0">
                            Parrilla de Calidad
                        </p>
                        <p className="text-warning text-uppercase mb-0">
                            Carta Oficial de Platos
                        </p>
                    </div>
                </div>

                <div className="border-top border-danger border-3 mb-4"></div>

                <h5 className="text-warning text-uppercase mb-3">
                    Nuestros Cortes & Carnes al Carbón
                </h5>

                <div className="bg-dark row align-items-center mb-3 py-3">
                    <div className="col-9 px-4">
                        <h5 className="text-warning mb-2">Bife Ancho Angus Premium (400g)</h5>
                        <p className="mb-0">
                            Corte de gran jugosidad y marmoleo perfecto, asado a las brasas de carbón y leña fina.
                            Servido con sal de maras.
                        </p>
                    </div>
                    <div className="col-3 d-flex justify-content-between align-items-center border-start border-secondary">
                        <div className="container">
                            <h4 className="mb-0">S/ 79.00</h4>
                        </div>
                        <div className="container">
                            <Link to="/reservas" className="btn btn-light">
                                <span>Reservar</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-dark row align-items-center mb-3 py-3">
                    <div className="col-9 px-4">
                        <h5 className="text-warning mb-2">Lomo Fino Gourmet (350g)</h5>
                        <p className="mb-0">
                            El corte más tierno y magro de nuestra parrilla, sellado a fuego alto para mantener
                            toda su suavidad y jugosidad.
                        </p>
                    </div>
                    <div className="col-3 d-flex justify-content-between align-items-center border-start border-secondary">
                        <div className="container">
                            <h4 className="mb-0">S/ 85.00</h4>
                        </div>
                        <div className="container">
                            <Link to="/reservas" className="btn btn-light">
                                <span>Reservar</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-dark row align-items-center mb-3 py-3">
                    <div className="col-9 px-4">
                        <h5 className="text-warning mb-2">Picaña a las Brasas</h5>
                        <p className="mb-0">
                            El corte más tierno y magro de nuestra parrilla, sellado a fuego alto para mantener
                            toda su suavidad y jugosidad.
                        </p>
                    </div>
                    <div className="col-3 d-flex justify-content-between align-items-center border-start border-secondary">
                        <div className="container">
                            <h4 className="mb-0">S/ 75.00</h4>
                        </div>
                        <div className="container">
                            <Link to="/reservas" className="btn btn-light">
                                <span>Reservar</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-dark row align-items-center mb-3 py-3">
                    <div className="col-9 px-4">
                        <h5 className="text-warning mb-2">Baby Beef seleccionado</h5>
                        <p className="mb-0">
                            Exquisito y suave corte de bife angosto tiernizado, asado lentamente con el toque secreto
                            de la casa.
                        </p>
                    </div>
                    <div className="col-3 d-flex justify-content-between align-items-center border-start border-secondary">
                        <div className="container">
                            <h4 className="mb-0">S/ 72.00</h4>
                        </div>
                        <div className="container">
                            <Link to="/reservas" className="btn btn-light">
                                <span>Reservar</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-dark row align-items-center mb-3 py-3">
                    <div className="col-9 px-4">
                        <h5 className="text-warning mb-2">Costillas de Cerdo en Salsa BBQ Smoked</h5>
                        <p className="mb-0">
                            Costillas tiernas ahumadas que se desprenden del hueso, bañadas en nuestra salsa barbacoa
                            artesanal de la casa.
                        </p>
                    </div>
                    <div className="col-3 d-flex justify-content-between align-items-center border-start border-secondary">
                        <div className="container">
                            <h4 className="mb-0">S/ 64.00</h4>
                        </div>
                        <div className="container">
                            <Link to="/reservas" className="btn btn-light">
                                <span>Reservar</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-dark row align-items-center mb-4 py-3">
                    <div className="col-9 px-4">
                        <h5 className="text-warning mb-2">Pechuga de Pollo al Fire Pit</h5>
                        <p className="mb-0">
                            Filete de pechuga marinado en finas hierbas y cerveza negra, dorado a la parrilla,
                            tierno y muy jugoso.
                        </p>
                    </div>
                    <div className="col-3 d-flex justify-content-between align-items-center border-start border-secondary">
                        <div className="container">
                            <h4 className="mb-0">S/ 48.00</h4>
                        </div>
                        <div className="container">
                            <Link to="/reservas" className="btn btn-light">
                                <span>Reservar</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <h5 className="text-warning text-uppercase mb-3">
                    Entradas y Extras de la Parrilla
                </h5>

                <div className="row g-5">
                    <div className="col-12 col-md-6">
                        <div className="bg-dark row align-items-center py-3">
                            <div className="col-8 px-4">
                                <h5 className="text-warning mb-1">Anticuchos Carretilleros</h5>
                                <p className="mb-0">
                                    Dos palitos de corazón de res seleccionados, marinados en ají panca y especias.
                                </p>
                            </div>
                                <div className="col-4 text-end">
                                    <h4 className="mb-0">S/ 28.00</h4>
                                </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="bg-dark row align-items-center py-3">
                            <div className="col-8 px-4">
                                <h5 className="text-warning mb-1">Chorizos Artesanales</h5>
                                <p className="mb-0">
                                    Dos unidades de chorizos de la casa servidos con chimichurri rústico al oliva.
                                </p>
                            </div>
                            <div className="col-4 text-end">
                                <h4 className="mb-0">S/ 18.00</h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="bg-dark row align-items-center py-3">
                            <div className="col-8 px-4">
                                <h5 className="text-warning mb-1">Mollejitas al Limón</h5>
                                <p className="mb-0">
                                    Mollejas tiernas de res bien doradas al carbón, sazonadas con sal de maras y limón sutil.
                                </p>
                            </div>
                            <div className="col-4 text-end">
                                <h4 className="mb-0">S/ 24.00</h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="bg-dark row align-items-center py-3">
                            <div className="col-8 px-4">
                                <h5 className="text-warning mb-1">Papas Rústicas Nativas</h5>
                                <p className="mb-0">
                                    Porción crocante de papas nativas con piel perfumadas con romero y ajo crocante.
                                </p>
                            </div>
                            <div className="col-4 text-end">
                                <h4 className="mb-0">S/ 16.00</h4>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}