import React from 'react'

export default function Reservas() {
    return (
        <div className="bg-black text-white min-vh-100 py-4">
            <div className="row mb-4 g-0">
                <div className="col-12">
                    <img
                        src="https://thumbs.dreamstime.com/b/carnes-la-parrilla-en-barbacoa-vista-panor%C3%A1mica-de-varios-cortes-carne-una-sobre-llamas-vibrantes-parece-estar-bien-marinada-y-385351371.jpg"
                        alt="Parrilla Gourmet Fire Pit"
                        className="img-fluid w-100"
                        style={{ display: 'block', height: '300px', objectFit: 'cover' }}
                    />
                </div>
            </div>

            <div className="container">

                <div className="row g-4 justify-content-center">

                    <div className="col-12 col-lg-10 col-xl-9">
                        <h2 className="text-uppercase fw-bold text-center mb-4">
                            Reservar ahora
                        </h2>

                        <div
                            className="rounded-4 p-4 p-md-5"
                            style={{ backgroundColor: '#262626' }}
                        >
                            <form>
                                <div className="row g-4">
                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="nombres" className="form-label text-uppercase fw-bold small">
                                                Nombres completos
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control border-0 text-white rounded-3 form-input-dark"
                                                id="nombres"
                                                placeholder="Ingrese su nombre completo..."
                                                style={{ backgroundColor: '#666463' }}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="fechaHora" className="form-label text-uppercase fw-bold small">
                                                Fecha y hora
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control border-0 text-white rounded-3 form-input-dark"
                                                id="fechaHora"
                                                placeholder="DD/MM/AAAA 00:00"
                                                style={{ backgroundColor: '#666463' }}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="carta" className="form-label text-uppercase fw-bold small">
                                                Carta
                                            </label>
                                            <select
                                                className="form-select border-0 text-white rounded-3 form-input-dark"
                                                id="carta"
                                                style={{ backgroundColor: '#666463' }}
                                                required
                                                defaultValue=""
                                            >
                                                <option value="" disabled>Seleccione la carta</option>
                                                <option value="carnes">Carnes al Carbón</option>
                                                <option value="entradas">Entradas y Extras</option>
                                                <option value="bebidas">Bebidas</option>
                                                <option value="promos">Promociones</option>
                                            </select>
                                        </div>

                                        <div className="mb-0 mb-md-3">
                                            <label htmlFor="comensales" className="form-label text-uppercase fw-bold small">
                                                Numero de comensales
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                className="form-control border-0 text-white rounded-3 form-input-dark"
                                                id="comensales"
                                                placeholder="Numero de comensales..."
                                                style={{ backgroundColor: '#666463' }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6 d-flex flex-column">
                                        <label htmlFor="descripcion" className="form-label text-uppercase fw-bold small">
                                            Descripcion
                                        </label>
                                        <textarea
                                            className="form-control border-0 text-white rounded-3 flex-grow-1 form-input-dark"
                                            id="descripcion"
                                            placeholder="Opcional"
                                            style={{ backgroundColor: '#666463', minHeight: '260px' }}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="btn btn-light w-100 text-uppercase fw-bold rounded-3 py-2"
                                    >
                                        Registrarse
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}