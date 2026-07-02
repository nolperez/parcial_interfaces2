import React from 'react'
import logo from '../../logo.png' // cambia la ruta según tu proyecto

export default function Footer() {
    return (
        <footer className="bg-black text-white py-4">
            <div className="container">
                <div className="row align-items-center">

                    <div className="col-12 col-md-4 text-center text-md-start mb-3 mb-md-0">
                        <img
                            src={logo}
                            alt="Logo"
                            style={{ height: "70px" }}
                        />
                    </div>

                    <div className="col-12 col-md-8 text-center text-md-start">
                        <h2 className="fw-bold text-uppercase mb-1">
                            PROXIMOS EVENTOS:
                        </h2>

                        <p className="fs-4 text-uppercase mb-0">
                            BAILES TRADICIONALES Y MUSICA EN VIVO
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    )
}