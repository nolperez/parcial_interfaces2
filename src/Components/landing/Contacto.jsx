import React, { useState } from 'react';
import api from '../../api/client';
import { useUI } from '../../context/UIContext';
import { getApiErrorMessage, validateRequiredForm } from '../../utils/swal';

export default function Contacto() {
    const { success, error: notifyError } = useUI();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: '',
    });

    const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateRequiredForm(e.currentTarget)) return;

        setLoading(true);
        try {
            await api.post('/contacto', form);
            success('Mensaje enviado. Te contactaremos pronto.');
            setForm({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
        } catch (err) {
            notifyError(getApiErrorMessage(err, 'No se pudo enviar el mensaje'));
        } finally {
            setLoading(false);
        }
    };

    const inputClass = 'form-control bg-dark text-white border-0 rounded-3';

    return (
        <div className="bg-black text-white min-vh-100 py-4">
            <div className="container-fluid px-0 mb-4">
                <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&h=400&fit=crop"
                    alt="Contacto Gourmet Fire Pit"
                    className="img-fluid w-100"
                    style={{ height: 260, objectFit: 'cover' }}
                />
            </div>

            <div className="container pb-5">
                <div className="row g-4 align-items-start">
                    <div className="col-12 col-lg-6">
                        <h2 className="text-uppercase fw-bold mb-2">Contáctanos</h2>
                        <p className="text-secondary mb-4">Escríbenos para reservas especiales, eventos o consultas.</p>

                        <div className="rounded-4 p-4" style={{ backgroundColor: '#2A2A2A' }}>
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-3">
                                    <label className="form-label text-secondary" htmlFor="nombre">Nombre</label>
                                    <input id="nombre" className={inputClass} value={form.nombre} onChange={set('nombre')} placeholder="Ingrese su nombre..." required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-secondary" htmlFor="email">Correo</label>
                                    <input id="email" type="email" className={inputClass} value={form.email} onChange={set('email')} placeholder="Ingrese su correo..." />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-secondary" htmlFor="telefono">Teléfono</label>
                                    <input id="telefono" className={inputClass} value={form.telefono} onChange={set('telefono')} placeholder="Ingrese su teléfono..." />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-secondary" htmlFor="asunto">Asunto</label>
                                    <input id="asunto" className={inputClass} value={form.asunto} onChange={set('asunto')} placeholder="Ingrese el asunto..." />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label text-secondary" htmlFor="mensaje">Mensaje</label>
                                    <textarea id="mensaje" rows="5" className={inputClass} value={form.mensaje} onChange={set('mensaje')} placeholder="Escriba su mensaje..." required />
                                </div>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <button
                                            type="button"
                                            className="btn w-100 text-white border-0 rounded-3"
                                            style={{ backgroundColor: '#5C2C2C' }}
                                            onClick={() => setForm({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' })}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button type="submit" className="btn btn-light w-100 rounded-3" disabled={loading}>
                                            {loading ? 'Enviando...' : 'Enviar'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="rounded-4 p-4 mb-4 bg-dark">
                            <h5 className="text-uppercase mb-3">
                                <i className="fa-solid fa-phone me-2" style={{ color: '#d4580e' }} aria-hidden="true" />
                                Teléfono
                            </h5>
                            <p className="mb-4">+51 958 788 541</p>
                            <h5 className="text-uppercase mb-3">
                                <i className="fa-solid fa-envelope me-2" style={{ color: '#d4580e' }} aria-hidden="true" />
                                Correo
                            </h5>
                            <p className="mb-4">reservas@gourmetfirepit.com</p>
                            <h5 className="text-uppercase mb-3">
                                <i className="fa-solid fa-location-dot me-2" style={{ color: '#d4580e' }} aria-hidden="true" />
                                Dirección
                            </h5>
                            <p className="mb-0">Av. Carlos Izaguirre 813, Los Olivos 15301</p>
                        </div>
                        <div className="rounded-4 overflow-hidden bg-dark">
                            <iframe
                                title="Mapa Gourmet Fire Pit"
                                src="https://maps.google.com/maps?q=Los%20Olivos%20Lima&t=&z=14&ie=UTF8&iwloc=&output=embed"
                                className="w-100 border-0"
                                style={{ minHeight: 280 }}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
