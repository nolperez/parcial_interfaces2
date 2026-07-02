import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../logo.png";

export default function Navegacion() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black py-3">
      <div className="container">

        {/* Logo */}
        <NavLink className="navbar-brand me-5" to="/">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "70px" }}
          />
        </NavLink>

        {/* Botón responsive */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav gap-3">

            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `btn ${
                    isActive
                      ? "btn-danger"
                      : "btn-outline-light"
                  } rounded-3 px-4 py-2 fw-bold`
                }
              >
                INICIO
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  `btn ${
                    isActive
                      ? "btn-danger"
                      : "btn-outline-light"
                  } rounded-3 px-4 py-2 fw-bold`
                }
              >
                MENÚ
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/bebidas"
                className={({ isActive }) =>
                  `btn ${
                    isActive
                      ? "btn-danger"
                      : "btn-outline-light"
                  } rounded-3 px-4 py-2 fw-bold`
                }
              >
                BEBIDAS
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/nosotros"
                className={({ isActive }) =>
                  `btn ${
                    isActive
                      ? "btn-danger"
                      : "btn-outline-light"
                  } rounded-3 px-4 py-2 fw-bold`
                }
              >
                NOSOTROS
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contacto"
                className={({ isActive }) =>
                  `btn ${
                    isActive
                      ? "btn-danger"
                      : "btn-outline-light"
                  } rounded-3 px-4 py-2 fw-bold`
                }
              >
                CONTÁCTANOS
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `btn ${
                    isActive
                      ? "btn-danger"
                      : "btn-light"
                  } rounded-3 px-4 py-2 fw-bold`
                }
              >
                LOGIN
              </NavLink>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}