import React from 'react'

export default function Nosotros() {
    return (
        <div className="bg-black text-white min-vh-100 py-5">
            <div className="container">

                <div className="row align-items-center g-5">

                    <div className="col-12 col-lg-6">
                        <h3 className="text-warning text-uppercase mb-4">
                            Nuestra Historia y Pasión
                        </h3>

                        <p className="fs-4 lh-sm">
                            Gourmet Fire Pit nació de una pasión compartida: el arte del fuego y la búsqueda
                            de la experiencia culinaria definitiva. No somos solo un restaurante de parrilla;
                            somos guardianes de una tradición que celebra el sabor y enciende momentos inolvidables.
                        </p>

                        <p className="fs-4 lh-sm mt-4">
                            Nuestra misión es simple: brindarte una experiencia única donde la alta calidad,
                            la tradición del carbón y el calor de compartir se unen en cada bocado.
                        </p>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className=" rounded-5 p-4 text-center">
                            <img
                                src="https://img.magnific.com/foto-gratis/chef-profesional-cocinando-verduras-cebolla-carne-parrilla-fuego-humo-hermoso-hombre-concentrado-preparacion-antecedentes-alimentarios-cocina-moderna-restaurante_651396-3910.jpg"
                                alt="Gourmet Fire Pit" style={{ width: '250px', height: 'auto' }}
                                className="img-fluid rounded-5 mb-4"
                            />

                            <h6 className="text-white text-uppercase">
                                Nuestra promesa: buen corte, buen fuego, buen momento.
                            </h6>

                            <p className="text-warning text-uppercase small mb-0">
                                Gourmet Fire Pit — Sabor que enciende momentos
                            </p>
                        </div>
                    </div>

                </div>

                <div className="row g-4 mt-5">

                    <h3>Nuestros Pilares</h3>

                    <div className="col-12 col-md-4">
                        <div className="bg-dark rounded-5 text-center p-4 h-100">
                            <div className="text-danger fs-1">
                                <i className="bi bi-award-fill"></i>
                            </div>

                            <h5 className="text-white text-uppercase fw-bold mb-2">
                                Cortes Selectos
                            </h5>

                            <p className="text-white mb-0">
                                Carnes de primera calidad maduradas a la perfección.
                            </p>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="bg-dark rounded-5 text-center p-4 h-100">
                            <div className="text-warning fs-1">
                                <i className="bi bi-fire"></i>
                            </div>

                            <h5 className="text-white text-uppercase fw-bold mb-2">
                                Auténtica Parrilla
                            </h5>

                            <p className="text-white mb-0">
                                Técnica ancestral con leña seleccionada y carbón.
                            </p>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="bg-dark rounded-5 text-center p-4 h-100">
                            <div className="text-warning fs-1">
                                <i className="bi bi-stars"></i>
                            </div>

                            <h5 className="text-white text-uppercase fw-bold mb-2">
                                Garantía Gourmet
                            </h5>

                            <p className="text-white mb-0">
                                Alta cocina con pasión en cada detalle culinario.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}