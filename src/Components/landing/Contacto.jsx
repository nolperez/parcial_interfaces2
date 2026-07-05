import React from 'react'

export default function Contacto() {
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

                <div className="row g-4 align-items-start">

                    <div className="col-12 col-md-5">
                        <h2 className="text-uppercase fw-bold mb-4">
                            Contactanos
                        </h2>

                        <div
                            className="rounded-4 p-4"
                            style={{ backgroundColor: '#2A2A2A' }}
                        >
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label text-secondary">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-0 text-white rounded-3 form-input-dark"
                                        id="nombre"
                                        placeholder="Ingrese el nombre..."
                                        style={{ backgroundColor: '#333333' }}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="precio" className="form-label text-secondary">
                                        Precio
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-0 text-white rounded-3 form-input-dark"
                                        id="precio"
                                        placeholder="Ejm. 25.00"
                                        style={{ backgroundColor: '#333333' }}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="descripcion" className="form-label text-secondary">
                                        Descripción
                                    </label>
                                    <textarea
                                        className="form-control border-0 text-white rounded-3 form-input-dark"
                                        id="descripcion"
                                        rows="5"
                                        placeholder="Opcional"
                                        style={{ backgroundColor: '#333333' }}
                                    ></textarea>
                                </div>

                                <div className="row g-3">
                                    <div className="col-6">
                                        <button
                                            type="reset"
                                            className="btn w-100 text-white border-0 rounded-3"
                                            style={{ backgroundColor: '#5C2C2C' }}
                                        >
                                            Cancelar
                                        </button>
                                    </div>

                                    <div className="col-6">
                                        <button
                                            type="submit"
                                            className="btn w-100 text-white border-0 rounded-3"
                                            style={{ backgroundColor: '#1C3C1C' }}
                                        >
                                            Crear
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-uppercase fw-bold mb-0">
                                Telefono: <span className="fw-bold">+51958788541</span>
                            </h3>
                        </div>
                    </div>

                    <div className="col-12 col-md-7">
                        <h2 className="text-uppercase fw-bold mb-2">
                            Estamos ubicados en
                        </h2>

                        <p className="text-secondary mb-4">
                            Av. Carlos Izaguirre 813, Los Olivos 15301
                        </p>

                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwC7_aCvkowAsUZAhuyRlpaQOf9w1fPpbv-ypwiK2LI1rHFuxTuIpCFidk&s=10"
                            alt="Ubicación Gourmet Fire Pit"
                            className="img-fluid w-100 rounded-4"
                        />
                    </div>

                </div>

            </div>
        </div>
    )
}