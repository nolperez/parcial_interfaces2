import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';
import carne from '../../carne.png';
import api from '../../api/client';
import { swalError } from '../../utils/swal';
import { parseComposicion } from '../../utils/composicion';

const money = (v) => {
    const n = Number(v || 0);
    if (!n) return null;
    return `S/ ${n.toFixed(2)}`;
};

/** Quita emojis / pictogramas del texto (API o seed) */
const stripEmoji = (text) =>
    String(text || '')
        .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '')
        .replace(/^\s*[✓✔✕✖★☆•●◆▪▫►→←]+/u, '')
        .trim();

const fallbackImages = [
    'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=250&fit=crop',
    'https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/10/01/5e997e89af554.jpeg',
    'https://gourmet.iprospect.cl/wp-content/uploads/2020/08/foto-portada.jpg',
];

export default function Inicio() {
    const [promos, setPromos] = useState([]);
    const [menus, setMenus] = useState([]);
    const [bebidas, setBebidas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get('/landing')
            .then(({ data }) => {
                setPromos(data.promos || []);
                setMenus(data.menus_destacados || []);
                setBebidas(data.bebidas_destacadas || []);
            })
            .catch(() => swalError('No se pudo cargar el contenido desde el servidor'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="bg-black text-white">
            <section
                className="min-vh-50 py-5 position-relative d-flex align-items-center"
                style={{
                    backgroundImage: `url(${carne})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: 600,
                }}
            >
                <div
                    className="position-absolute w-100 h-100"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', top: 0, left: 0 }}
                />

                <div className="container position-relative z-2">
                    <div className="row align-items-center justify-content-start">
                        <div className="col-md-6 col-12">
                            <img src={logo} alt="Gourmet Fire Pit" className="img-fluid d-block mx-auto justify-content-center mb-4" style={{ maxWidth: '500px' }} />
                            <p className="fs-7 text-center mb-1" style={{ color: '#d4580e' }}>SABOR QUE ENCIENDE MOMENTOS</p>
                            <p className="mb-3 text-center text-white" style={{ fontSize: '0.75rem' }}>CARNES PREMIUM - PARRILLA AL FUEGO - EXPERIENCIA UNICA</p>
                            <div className="container">
                                <div className="row row-cols-1 row-cols-md-4 text-center">
                                    <div className="col mb-4">
                                        <div className="p-3">
                                            <div className="fs-3 mb-2" style={{ color: '#d4580e' }}>
                                                <i className="fa-solid fa-fire" aria-hidden="true" />
                                            </div>
                                            <h6 className="fw-bold text-uppercase" style={{ fontSize: '0.85rem' }}>Carnes Premium</h6>
                                            <p className="small text-muted" style={{ fontSize: '0.7rem' }}>
                                                {menus.filter((m) => m.categoria === 'carnes').length || 'Seleccionadas'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col mb-4">
                                        <div className="p-3">
                                            <div className="fs-3 mb-2" style={{ color: '#d4580e' }}>
                                                <i className="fa-solid fa-drumstick-bite" aria-hidden="true" />
                                            </div>
                                            <h6 className="fw-bold text-uppercase" style={{ fontSize: '0.85rem' }}>Parrilla al Fuego</h6>
                                            <p className="small text-muted" style={{ fontSize: '0.7rem' }}>Cocción en vivo</p>
                                        </div>
                                    </div>
                                    <div className="col mb-4">
                                        <div className="p-3">
                                            <div className="fs-3 mb-2" style={{ color: '#d4580e' }}>
                                                <i className="fa-solid fa-wine-glass" aria-hidden="true" />
                                            </div>
                                            <h6 className="fw-bold text-uppercase" style={{ fontSize: '0.85rem' }}>Bebidas Seleccionadas</h6>
                                            <p className="small text-muted" style={{ fontSize: '0.7rem' }}>
                                                {bebidas.length ? `${bebidas.length} opciones` : 'Premium'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col mb-4">
                                        <div className="p-3">
                                            <div className="fs-3 mb-2" style={{ color: '#d4580e' }}>
                                                <i className="fa-solid fa-certificate" aria-hidden="true" />
                                            </div>
                                            <h6 className="fw-bold text-uppercase" style={{ fontSize: '0.85rem' }}>Experiencia Garantizada</h6>
                                            <p className="small text-muted" style={{ fontSize: '0.7rem' }}>A la Parrilla</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-3" style={{ backgroundColor: '#4b0505' }}>
                <div className="container">
                    <div className="row align-items-center justify-content-center text-center">
                        <h2 className="fw-bold text-white mb-0">
                            <i className="fa-solid fa-tags me-2" aria-hidden="true" />
                            PROMOCIONES
                        </h2>
                    </div>
                </div>
            </section>

            <section className="py-4">
                <div className="container">
                    {loading && <p className="text-center text-secondary small">Cargando promociones...</p>}

                    <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-3">
                        {promos.map((promo, index) => {
                            const bullets = String(promo.descripcion || '')
                                .split('\n')
                                .map((x) => stripEmoji(x))
                                .filter(Boolean)
                                .slice(0, 3);
                            const precio = money(promo.precio);

                            return (
                                <div className="col" key={promo.id}>
                                    <div
                                        className="card border-0 h-100 d-flex flex-column overflow-hidden"
                                        style={{ borderTop: '2px solid #d4580e', backgroundColor: '#0a0a0a', borderRadius: '10px' }}
                                    >
                                        <img
                                            src={promo.imagen || fallbackImages[index % fallbackImages.length]}
                                            alt={stripEmoji(promo.nombre)}
                                            className="card-img-top"
                                            style={{ height: 100, objectFit: 'cover' }}
                                        />
                                        <div className="card-body text-center d-flex flex-column flex-grow-1 p-2 p-md-3">
                                            <h6 className="card-title fw-bold text-uppercase text-white mb-1" style={{ fontSize: '0.85rem' }}>
                                                {stripEmoji(promo.nombre)}
                                            </h6>
                                            {promo.subtitulo && (
                                                <p className="text-white mb-1" style={{ fontSize: '0.7rem' }}>{stripEmoji(promo.subtitulo)}</p>
                                            )}
                                            {promo.etiqueta && (
                                                <p className="fw-bold mb-2 mb-md-3" style={{ color: '#d4580e', fontSize: '0.95rem' }}>
                                                    {stripEmoji(promo.etiqueta)}
                                                </p>
                                            )}
                                            <ul className="list-unstyled text-white mb-2 text-start mx-auto" style={{ maxWidth: 200, fontSize: '0.7rem' }}>
                                                {bullets.map((item) => (
                                                    <li key={item} className="mb-1 d-flex align-items-start gap-1">
                                                        <i className="fa-solid fa-check mt-1" style={{ color: '#d4580e', fontSize: '0.65rem' }} aria-hidden="true" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            {precio && <p className="fw-bold text-white mb-2" style={{ fontSize: '0.75rem' }}>AHORA {precio}</p>}
                                            <div className="mt-auto pt-1">
                                                <Link to="/reservas" className="btn btn-light btn-sm rounded-3 px-3">
                                                    <i className="fa-solid fa-calendar-check me-1" aria-hidden="true" />
                                                    Reservar mesa
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {!loading && promos.length === 0 ? (
                        <p className="text-center text-secondary small">No hay promociones disponibles.</p>
                    ) : null}
                </div>
            </section>

            <section className="py-3" style={{ backgroundColor: '#4b0505' }}>
                <div className="container text-center">
                    <h2 className="fw-bold text-white mb-0 h4">
                        <i className="fa-solid fa-utensils me-2" aria-hidden="true" />
                        DESTACADOS DEL MENÚ
                    </h2>
                </div>
            </section>

            <section className="py-4">
                <div className="container">
                    <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-3">
                        {menus.slice(0, 8).map((item) => {
                            const partes = parseComposicion(item.composicion).slice(0, 3);
                            return (
                            <div className="col" key={item.id}>
                                <div className="card h-100 border-0 bg-dark text-white rounded-3 overflow-hidden">
                                    {item.imagen && (
                                        <img src={item.imagen} alt={item.nombre} className="card-img-top" style={{ height: 100, objectFit: 'cover' }} />
                                    )}
                                    <div className="card-body p-2 p-md-3">
                                        <h6 className="text-uppercase fw-bold mb-1" style={{ color: '#d4580e', fontSize: '0.8rem' }}>{stripEmoji(item.nombre)}</h6>
                                        <p className="text-secondary text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>{item.categoria}</p>
                                        <p className="mb-1 text-secondary" style={{ fontSize: '0.7rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {stripEmoji(item.descripcion)}
                                        </p>
                                        {partes.length > 0 && (
                                            <p className="mb-2" style={{ fontSize: '0.65rem', color: '#c9c9c9' }}>
                                                Integra: {partes.join(' · ')}
                                            </p>
                                        )}
                                        <p className="fw-bold mb-0" style={{ fontSize: '0.85rem' }}>{money(item.precio_promo || item.precio)}</p>
                                    </div>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                    <div className="text-center mt-3">
                        <Link to="/menu" className="btn btn-outline-light btn-sm rounded-3">
                            <i className="fa-solid fa-book-open me-2" aria-hidden="true" />
                            Ver menú completo
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-3" style={{ backgroundColor: '#4b0505' }}>
                <div className="container text-center">
                    <h2 className="fw-bold text-white mb-0 h4">
                        <i className="fa-solid fa-wine-glass me-2" aria-hidden="true" />
                        BEBIDAS DESTACADAS
                    </h2>
                </div>
            </section>

            <section className="py-4">
                <div className="container">
                    <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-3">
                        {bebidas.slice(0, 8).map((item) => (
                            <div className="col" key={item.id}>
                                <div className="card h-100 border-0 bg-dark text-white rounded-3 overflow-hidden">
                                    {item.imagen && (
                                        <img src={item.imagen} alt={item.nombre} className="card-img-top" style={{ height: 100, objectFit: 'cover' }} />
                                    )}
                                    <div className="card-body p-2 p-md-3">
                                        <h6 className="text-uppercase fw-bold mb-1" style={{ color: '#d4580e', fontSize: '0.8rem' }}>{stripEmoji(item.nombre)}</h6>
                                        <p className="text-secondary text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>{stripEmoji(item.seccion)}</p>
                                        <p className="mb-2 text-secondary" style={{ fontSize: '0.7rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {stripEmoji(item.descripcion)}
                                        </p>
                                        <p className="fw-bold mb-0" style={{ fontSize: '0.85rem' }}>{money(item.precio)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-3">
                        <Link to="/bebidas" className="btn btn-outline-light btn-sm rounded-3">
                            <i className="fa-solid fa-wine-bottle me-2" aria-hidden="true" />
                            Ver carta de bebidas
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
