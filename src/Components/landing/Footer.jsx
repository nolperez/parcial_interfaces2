import React from 'react';
import logo from '../../logo.png';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container">
        <div className="row align-items-center g-3">
          <div className="col-12 col-md-4 text-center text-md-start">
            <img src={logo} alt="Logo Gourmet Fire Pit" className="img-fluid" style={{ height: 48 }} />
          </div>

          <div className="col-12 col-md-8 text-center text-md-start">
            <h2 className="fw-bold text-uppercase mb-1 fs-5 fs-md-4">
              <i className="fa-solid fa-calendar-days me-2" style={{ color: '#d4580e' }} aria-hidden="true" />
              PROXIMOS EVENTOS:
            </h2>
            <p className="text-uppercase mb-0 fs-6 fs-md-5">
              <i className="fa-solid fa-music me-2" aria-hidden="true" />
              BAILES TRADICIONALES Y MUSICA EN VIVO
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
