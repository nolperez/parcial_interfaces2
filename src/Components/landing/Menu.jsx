import React from 'react';
import { Link } from 'react-router-dom';

const PlatilloRow = ({ titulo, descripcion, precio }) => (
    <div className="bg-dark row align-items-stretch mb-3 py-3 mx-0 g-0">
        <div className="col-12 col-lg-9 px-3 px-md-4">
            <h5 className="text-warning mb-2">{titulo}</h5>
            <p className="mb-0">{descripcion}</p>
        </div>
        <div className="col-12 col-lg-3 d-flex flex-row justify-content-between align-items-center gap-3 border-top border-lg-top-0 border-lg-start border-secondary pt-3 pt-lg-0 px-3 px-md-4">
            <h4 className="mb-0">{precio}</h4>
            <Link to="/reservas" className="btn btn-light flex-shrink-0">
                <span>Reservar</span>
            </Link>
        </div>
    </div>
);

const EntradaRow = ({ titulo, descripcion, precio }) => (
    <div className="bg-dark row align-items-center py-3 mx-0 g-0">
        <div className="col-12 col-sm-8 px-3 px-md-4">
            <h5 className="text-warning mb-1">{titulo}</h5>
            <p className="mb-0">{descripcion}</p>
        </div>
        <div className="col-12 col-sm-4 px-3 px-md-4 text-sm-end pt-2 pt-sm-0">
            <h4 className="mb-0">{precio}</h4>
        </div>
    </div>
);

export default function Menu() {
    return (
        <div className="bg-black text-white min-vh-100 py-3">
            <div className="container px-3 px-md-4">

                <div className="text-center mb-4">
                    <div className="d-inline-block px-2 px-md-4 py-2">
                        <h1 className="text-white fw-bold text-uppercase mb-0 fs-3 fs-md-1">
                            Gourmet Fire Pit
                        </h1>
                        <p className="text-danger text-uppercase fw-bold mb-0">Parrilla de Calidad</p>
                        <p className="text-warning text-uppercase mb-0">Carta Oficial de Platos</p>
                    </div>
                </div>

                <div className="border-top border-danger border-3 mb-4"></div>

                <h5 className="text-warning text-uppercase mb-3">
                    Nuestros Cortes & Carnes al Carbón
                </h5>

                <PlatilloRow
                    titulo="Bife Ancho Angus Premium (400g)"
                    descripcion="Corte de gran jugosidad y marmoleo perfecto, asado a las brasas de carbón y leña fina. Servido con sal de maras."
                    precio="S/ 79.00"
                />
                <PlatilloRow
                    titulo="Lomo Fino Gourmet (350g)"
                    descripcion="El corte más tierno y magro de nuestra parrilla, sellado a fuego alto para mantener toda su suavidad y jugosidad."
                    precio="S/ 85.00"
                />
                <PlatilloRow
                    titulo="Picaña a las Brasas"
                    descripcion="El corte más tierno y magro de nuestra parrilla, sellado a fuego alto para mantener toda su suavidad y jugosidad."
                    precio="S/ 75.00"
                />
                <PlatilloRow
                    titulo="Baby Beef seleccionado"
                    descripcion="Exquisito y suave corte de bife angosto tiernizado, asado lentamente con el toque secreto de la casa."
                    precio="S/ 72.00"
                />
                <PlatilloRow
                    titulo="Costillas de Cerdo en Salsa BBQ Smoked"
                    descripcion="Costillas tiernas ahumadas que se desprenden del hueso, bañadas en nuestra salsa barbacoa artesanal de la casa."
                    precio="S/ 64.00"
                />
                <PlatilloRow
                    titulo="Pechuga de Pollo al Fire Pit"
                    descripcion="Filete de pechuga marinado en finas hierbas y cerveza negra, dorado a la parrilla, tierno y muy jugoso."
                    precio="S/ 48.00"
                />

                <h5 className="text-warning text-uppercase mb-3 mt-4">
                    Entradas y Extras de la Parrilla
                </h5>

                <div className="row g-3 g-md-4">
                    <div className="col-12 col-md-6">
                        <EntradaRow
                            titulo="Anticuchos Carretilleros"
                            descripcion="Dos palitos de corazón de res seleccionados, marinados en ají panca y especias."
                            precio="S/ 28.00"
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <EntradaRow
                            titulo="Chorizos Artesanales"
                            descripcion="Dos unidades de chorizos de la casa servidos con chimichurri rústico al oliva."
                            precio="S/ 18.00"
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <EntradaRow
                            titulo="Mollejitas al Limón"
                            descripcion="Mollejas tiernas de res bien doradas al carbón, sazonadas con sal de maras y limón sutil."
                            precio="S/ 24.00"
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <EntradaRow
                            titulo="Papas Rústicas Nativas"
                            descripcion="Porción crocante de papas nativas con piel perfumadas con romero y ajo crocante."
                            precio="S/ 16.00"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
