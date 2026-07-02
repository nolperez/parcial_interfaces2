import React from 'react'

export default function Contacto() {
    return (
        <div className="bg-black text-white min-vh-100 py-4">
            <div className="row mb-4 g-0">
                <div className="col-12">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqQqJSNxsEYbqhKQD0ztV1x6ObuYSoaOXwD7alR7YrCw&s=10"
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

                        <form>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    className="form-control bg-secondary text-white border-0"
                                    id="nombre"
                                    placeholder="Ingrese el nombre..."
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="telefono" className="form-label">
                                    Teléfono
                                </label>
                                <input
                                    type="text"
                                    className="form-control bg-secondary text-white border-0"
                                    id="telefono"
                                    placeholder="Ejml. 958788540"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="descripcion" className="form-label">
                                    Descripción
                                </label>
                                <textarea
                                    className="form-control bg-secondary text-white border-0"
                                    id="descripcion"
                                    rows="5"
                                    placeholder="Opcional"
                                ></textarea>
                            </div>

                            <div className="row g-3">
                                <div className="col-6">
                                    <button type="reset" className="btn btn-secondary w-100">
                                        Cancelar
                                    </button>
                                </div>

                                <div className="col-6">
                                    <button type="submit" className="btn btn-secondary w-100">
                                        Crear
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-5">
                            <h3 className="text-uppercase fw-bold mb-3">
                                Telefono
                            </h3>
                            <p className="fw-bold mb-0">
                                +51958788541
                            </p>
                        </div>
                    </div>

                    <div className="col-12 col-md-7">
                        <div className="pt-md-5 mt-md-5">
                            <h2 className="text-uppercase fw-bold mb-2">
                                Estamos ubicados en
                            </h2>

                            <p className="mb-3">
                                Av. Carlos Izaguirre 813, Los Olivos 15301
                            </p>

                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwC7_aCvkowAsUZAhuyRlpaQOf9w1fPpbv-ypwiK2LI1rHFuxTuIpCFidk&s=10"
                                alt="Ubicación Gourmet Fire Pit"
                                className="img-fluid w-100"
                            />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}