import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { swalError } from '../../utils/swal';
import { parseComposicion } from '../../utils/composicion';

const money = (v) => `S/ ${Number(v || 0).toFixed(2)}`;

export default function Menu() {
    const [items, setItems] = useState([]);
    const [filtro, setFiltro] = useState('todas');

    useEffect(() => {
        api.get('/menus')
            .then(({ data }) => setItems(data || []))
            .catch(() => swalError('No se pudo cargar el menú'));
    }, []);

    const categorias = useMemo(() => {
        const set = new Set(items.map((i) => i.categoria).filter(Boolean));
        return ['todas', ...Array.from(set)];
    }, [items]);

    const filtrados = items.filter((i) => filtro === 'todas' || i.categoria === filtro);

    return (
        <div className="bg-black text-white min-vh-100 py-4">
            <div className="container">
                <div className="text-center mb-3">
                    <p className="text-uppercase fw-bold mb-1" style={{ color: '#d4580e' }}>Carta</p>
                    <h2 className="text-uppercase fw-bold h3">Menú Gourmet Fire Pit</h2>
                </div>

                <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
                    {categorias.map((c) => (
                        <button
                            key={c}
                            type="button"
                            className={`btn btn-sm rounded-3 text-uppercase fw-semibold ${filtro === c ? 'btn-light' : 'btn-outline-light'}`}
                            onClick={() => setFiltro(c)}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-3">
                    {filtrados.map((item) => {
                        const agotado = item.agotado || Number(item.stock) <= 0 || !item.disponible;
                        const partes = parseComposicion(item.composicion).slice(0, 4);
                        return (
                            <div className="col" key={item.id}>
                                <div className="card h-100 border-0 bg-dark text-white overflow-hidden rounded-3">
                                    {item.imagen && (
                                        <img src={item.imagen} alt={item.nombre} className="card-img-top" style={{ height: 100, objectFit: 'cover' }} />
                                    )}
                                    <div className="card-body d-flex flex-column p-2 p-md-3">
                                        <div className="d-flex justify-content-between align-items-start gap-1 mb-1">
                                            <h6 className="card-title text-uppercase fw-bold mb-0" style={{ fontSize: '0.8rem' }}>{item.nombre}</h6>
                                            <span className={`badge ${agotado ? 'text-bg-secondary' : 'text-bg-success'}`} style={{ fontSize: '0.6rem' }}>
                                                {agotado ? 'Agotado' : item.stock}
                                            </span>
                                        </div>
                                        <p className="text-secondary text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>{item.categoria}</p>
                                        <p className="mb-1" style={{ fontSize: '0.7rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {item.descripcion}
                                        </p>
                                        {partes.length > 0 && (
                                            <p className="mb-2" style={{ fontSize: '0.65rem', color: '#c9c9c9' }}>
                                                Integra: {partes.join(' · ')}
                                            </p>
                                        )}
                                        <div className="d-flex justify-content-between align-items-center mt-auto gap-2">
                                            <div>
                                                <span className="fw-bold" style={{ color: '#d4580e', fontSize: '0.85rem' }}>{money(item.precio_promo || item.precio)}</span>
                                                {item.precio_promo && Number(item.precio_promo) < Number(item.precio) && (
                                                    <span className="text-secondary text-decoration-line-through ms-1" style={{ fontSize: '0.7rem' }}>{money(item.precio)}</span>
                                                )}
                                            </div>
                                            <Link
                                                to={`/reservas?menu_id=${item.id}`}
                                                className={`btn btn-sm rounded-3 ${agotado ? 'btn-outline-secondary disabled' : 'btn-light'}`}
                                                aria-disabled={agotado}
                                                onClick={(e) => agotado && e.preventDefault()}
                                            >
                                                Reservar
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
