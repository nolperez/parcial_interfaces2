import React from 'react';
import logo from '../../logo.png';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-4 landing-footer">
      <div className="container">
        <div className="row align-items-center g-3">
          <div className="col-12 col-md-4 text-center text-md-start">
            <img src={logo} alt="Logo Gourmet Fire Pit" className="landing-logo-footer" />
          </div>

          <div className="col-12 col-md-8 text-center text-md-start">
            <h2 className="fw-bold text-uppercase mb-1 fs-5 fs-md-4">
              PROXIMOS EVENTOS:
            </h2>
            <p className="text-uppercase mb-0 fs-6 fs-md-5">
              BAILES TRADICIONALES Y MUSICA EN VIVO
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
