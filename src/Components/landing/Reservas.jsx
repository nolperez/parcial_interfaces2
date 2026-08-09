import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import { getApiErrorMessage, swalWarning, validateRequiredForm } from '../../utils/swal';
import { HORARIOS_RESERVA, esHorarioValido, formatHora12 } from '../../utils/horarios';

const hoyISO = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
};

const esFechaPasada = (fecha) => Boolean(fecha) && fecha < hoyISO();

const blankForm = () => ({
    nombres: '',
    nombre_comercial: '',
    registrado_por: '',
    tipo_documento: '',
    numero_documento: '',
    email: '',
    telefono: '',
    telefono_referencia: '',
    fecha: '',
    hora: '',
    mesa_id: '',
    asientos: '',
    comensales: '',
    metodo_pago_id: '',
    descripcion: '',
    items: [],
});

const fromUser = (user) => {
    if (!user) return blankForm();
    return {
        ...blankForm(),
        nombres: `${user.name || ''} ${user.apellidos || ''}`.trim(),
        tipo_documento: user.tipo_documento || '',
        numero_documento: user.numero_documento || '',
        email: user.email || '',
        telefono: user.telefono || '',
    };
};

const toCartItem = (tipo, producto) => ({
    menu_id: tipo === 'menu' ? producto.id : null,
    bebida_id: tipo === 'bebida' ? producto.id : null,
    nombre: producto.nombre,
    precio: Number(producto.precio_promo || producto.precio),
    cantidad: 1,
    stock: Number(producto.stock),
});

export default function Reservas() {
    const { user, isAuthenticated } = useAuth();
    const { success, error: notifyError } = useUI();
    const [searchParams] = useSearchParams();
    const menuIdParam = searchParams.get('menu_id');
    const bebidaIdParam = searchParams.get('bebida_id');
    const prefillDone = useRef('');

    const [loading, setLoading] = useState(false);
    const [menus, setMenus] = useState([]);
    const [bebidas, setBebidas] = useState([]);
    const [mesas, setMesas] = useState([]);
    const [metodos, setMetodos] = useState([]);
    const [form, setForm] = useState(() => fromUser(user));

    const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

    useEffect(() => {
        setForm((prev) => {
            // Solo rellena datos de contacto del perfil; no pisa items ni fecha/mesa.
            if (!user) {
                return {
                    ...blankForm(),
                    items: prev.items,
                    fecha: prev.fecha,
                    hora: prev.hora,
                    mesa_id: prev.mesa_id,
                    metodo_pago_id: prev.metodo_pago_id,
                    descripcion: prev.descripcion,
                    comensales: prev.comensales,
                    asientos: prev.asientos,
                };
            }
            return {
                ...prev,
                nombres: prev.nombres || `${user.name || ''} ${user.apellidos || ''}`.trim(),
                tipo_documento: prev.tipo_documento || user.tipo_documento || '',
                numero_documento: prev.numero_documento || user.numero_documento || '',
                email: prev.email || user.email || '',
                telefono: prev.telefono || user.telefono || '',
            };
        });
    }, [user]);

    useEffect(() => {
        Promise.all([
            api.get('/menus', { params: { solo_disponibles: 1 } }),
            api.get('/bebidas', { params: { solo_disponibles: 1 } }),
            api.get('/metodos-pago'),
        ]).then(([m, b, p]) => {
            setMenus(m.data || []);
            setBebidas(b.data || []);
            setMetodos(p.data || []);
        }).catch(() => notifyError('No se pudo cargar el catálogo'));
    }, [notifyError]);

    // Precarga plato/bebida desde el botón Reservar (?menu_id= / ?bebida_id=)
    useEffect(() => {
        const key = `${menuIdParam || ''}|${bebidaIdParam || ''}`;
        if (!key || key === '|') return;
        if (prefillDone.current === key) return;
        if (menuIdParam && !menus.length) return;
        if (bebidaIdParam && !bebidas.length) return;

        const nextItems = [];
        if (menuIdParam) {
            const plato = menus.find((m) => String(m.id) === String(menuIdParam));
            if (plato && !plato.agotado && Number(plato.stock) > 0) {
                nextItems.push(toCartItem('menu', plato));
            }
        }
        if (bebidaIdParam) {
            const bebida = bebidas.find((b) => String(b.id) === String(bebidaIdParam));
            if (bebida && !bebida.agotado && Number(bebida.stock) > 0) {
                nextItems.push(toCartItem('bebida', bebida));
            }
        }

        prefillDone.current = key;
        if (nextItems.length) {
            setForm((prev) => {
                const merged = [...prev.items];
                nextItems.forEach((item) => {
                    const keyId = item.menu_id ? 'menu_id' : 'bebida_id';
                    const id = item[keyId];
                    if (!merged.some((x) => x[keyId] === id)) merged.push(item);
                });
                return { ...prev, items: merged };
            });
        }
    }, [menuIdParam, bebidaIdParam, menus, bebidas]);

    useEffect(() => {
        if (!form.fecha || !form.hora || !esHorarioValido(form.hora)) {
            api.get('/mesas').then(({ data }) => {
                setMesas((data || []).map((m) => ({
                    ...m,
                    reservada: false,
                    seleccionable: !(Number(m.estadouso) === 3 || m.en_mantenimiento),
                    estado_reserva: (Number(m.estadouso) === 3 || m.en_mantenimiento) ? 'mantenimiento' : 'disponible',
                })));
            }).catch(() => {});
            return;
        }
        api.get('/mesas-disponibles', {
            params: {
                fecha_hora: `${form.fecha} ${form.hora}`,
                comensales: form.comensales || 1,
            },
        }).then(({ data }) => {
            const list = data || [];
            setMesas(list);
            setForm((prev) => {
                if (!prev.mesa_id) return prev;
                const selected = list.find((m) => String(m.idmesa) === String(prev.mesa_id));
                if (!selected || selected.reservada || selected.en_mantenimiento || selected.seleccionable === false) {
                    return { ...prev, mesa_id: '' };
                }
                return prev;
            });
        }).catch(() => setMesas([]));
    }, [form.fecha, form.hora, form.comensales]);

    const onSelectMesa = (e) => {
        const id = e.target.value;
        const mesa = mesas.find((m) => String(m.idmesa) === String(id));
        if (mesa?.reservada) {
            swalWarning('Mesa reservada en ese horario. Elige otra mesa u otro horario.', 'Mesa reservada');
            setForm((prev) => ({ ...prev, mesa_id: '' }));
            return;
        }
        if (mesa?.en_mantenimiento || Number(mesa?.estadouso) === 3) {
            swalWarning('Esta mesa está en mantenimiento y no se puede reservar.', 'Mesa no disponible');
            setForm((prev) => ({ ...prev, mesa_id: '' }));
            return;
        }
        setForm((prev) => ({ ...prev, mesa_id: id }));
    };

    const onSelectFecha = (e) => {
        const fecha = e.target.value;
        if (esFechaPasada(fecha)) {
            swalWarning('Solo puedes reservar a partir de hoy. Elige una fecha actual o futura.', 'Fecha no válida');
            setForm((prev) => ({ ...prev, fecha: '', hora: '', mesa_id: '' }));
            return;
        }
        setForm((prev) => ({ ...prev, fecha, hora: '', mesa_id: '' }));
    };

    const onSelectHora = (e) => {
        if (!form.fecha) {
            swalWarning('Primero selecciona la fecha de la reserva.', 'Fecha requerida');
            return;
        }
        if (esFechaPasada(form.fecha)) {
            swalWarning('Solo puedes reservar a partir de hoy. Elige una fecha actual o futura.', 'Fecha no válida');
            return;
        }
        const hora = e.target.value;
        setForm((prev) => ({ ...prev, hora, mesa_id: '' }));
    };

    const horariosDisponibles = useMemo(() => {
        if (!form.fecha) return [];
        if (esFechaPasada(form.fecha)) return [];
        if (form.fecha !== hoyISO()) return HORARIOS_RESERVA;

        const now = new Date();
        const minutosAhora = now.getHours() * 60 + now.getMinutes();
        return HORARIOS_RESERVA.filter((h) => {
            const [hh, mm] = h.value.split(':').map(Number);
            return hh * 60 + mm > minutosAhora;
        });
    }, [form.fecha]);

    const total = useMemo(
        () => form.items.reduce((acc, it) => acc + Number(it.precio || 0) * Number(it.cantidad || 1), 0),
        [form.items]
    );

    const addItem = (tipo, producto) => {
        if (producto.agotado || Number(producto.stock) <= 0) {
            notifyError('Producto agotado');
            return;
        }
        setForm((prev) => {
            const key = tipo === 'menu' ? 'menu_id' : 'bebida_id';
            const exists = prev.items.find((i) => i[key] === producto.id);
            if (exists) {
                return {
                    ...prev,
                    items: prev.items.map((i) =>
                        i[key] === producto.id
                            ? { ...i, cantidad: Math.min(Number(i.cantidad) + 1, Number(producto.stock)) }
                            : i
                    ),
                };
            }
            return {
                ...prev,
                items: [...prev.items, toCartItem(tipo, producto)],
            };
        });
    };

    const updateCantidad = (index, cantidad) => {
        setForm((prev) => ({
            ...prev,
            items: prev.items
                .map((item, i) => (i === index ? { ...item, cantidad: Math.max(1, Math.min(cantidad, item.stock || 30)) } : item))
                .filter((item) => item.cantidad > 0),
        }));
    };

    const removeItem = (index) => {
        setForm((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateRequiredForm(e.currentTarget)) return;
        if (form.items.length === 0) {
            swalWarning('Debes agregar al menos un plato o bebida al pedido.', 'Campos requeridos');
            return;
        }
        if (!form.metodo_pago_id) {
            swalWarning('Selecciona un método de pago.', 'Campos requeridos');
            return;
        }
        if (!form.fecha) {
            swalWarning('Primero selecciona la fecha de la reserva.', 'Fecha requerida');
            return;
        }
        if (esFechaPasada(form.fecha)) {
            swalWarning('Solo puedes reservar a partir de hoy. Elige una fecha actual o futura.', 'Fecha no válida');
            return;
        }
        if (!form.hora || !esHorarioValido(form.hora)) {
            swalWarning('Selecciona un horario entre 08:00 AM y 10:00 PM.', 'Horario inválido');
            return;
        }
        if (form.fecha === hoyISO()) {
            const now = new Date();
            const [hh, mm] = form.hora.split(':').map(Number);
            if (hh * 60 + mm <= now.getHours() * 60 + now.getMinutes()) {
                swalWarning('El horario seleccionado ya pasó. Elige una hora futura.', 'Horario no válido');
                return;
            }
        }
        const mesaSel = mesas.find((m) => String(m.idmesa) === String(form.mesa_id));
        if (mesaSel && (Number(mesaSel.estadouso) === 3 || mesaSel.en_mantenimiento)) {
            swalWarning('Esta mesa está en mantenimiento y no se puede reservar.', 'Mesa no disponible');
            return;
        }
        if (mesaSel?.reservada || mesaSel?.seleccionable === false) {
            swalWarning('Mesa reservada en ese horario. Elige otra mesa u otro horario.', 'Mesa reservada');
            return;
        }

        setLoading(true);
        try {
            await api.post('/reservas', {
                ...form,
                fecha_hora: `${form.fecha} ${form.hora}`,
                comensales: Number(form.comensales),
                asientos: Number(form.asientos || form.comensales),
                mesa_id: Number(form.mesa_id),
                metodo_pago_id: form.metodo_pago_id ? Number(form.metodo_pago_id) : null,
                items: form.items.map((it) => ({
                    menu_id: it.menu_id,
                    bebida_id: it.bebida_id,
                    cantidad: Number(it.cantidad),
                })),
            });
            success(
                isAuthenticated
                    ? 'Reserva registrada. Puedes verla en Mis Reservas.'
                    : 'Reserva registrada correctamente.'
            );
            prefillDone.current = '';
            setForm(fromUser(user));
        } catch (err) {
            notifyError(getApiErrorMessage(err, 'No se pudo registrar la reserva'));
        } finally {
            setLoading(false);
        }
    };

    const inputClass = 'form-control bg-dark text-white border-0 rounded-3';
    const selectClass = 'form-select bg-dark text-white border-0 rounded-3';

    return (
        <div className="bg-black text-white min-vh-100 py-4">
            <div className="container-fluid px-0 mb-4">
                <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=400&fit=crop"
                    alt="Reservas Gourmet Fire Pit"
                    className="img-fluid w-100"
                    style={{ height: 260, objectFit: 'cover' }}
                />
            </div>

            <div className="container pb-5">
                <div className="text-center mb-4">
                    <p className="text-uppercase fw-bold mb-1" style={{ color: '#d4580e' }}>Gourmet Fire Pit</p>
                    <h2 className="text-uppercase fw-bold mb-2">Reservar mesa y platos</h2>
                    <p className="text-secondary mb-0">Completa tus datos, elige mesa disponible y arma tu pedido.</p>
                </div>

                <div className="row g-4">
                    <div className="col-12 col-lg-8">
                        <form onSubmit={handleSubmit} noValidate className="rounded-4 p-3 p-md-4" style={{ backgroundColor: '#2A2A2A' }} autoComplete="off">
                            <h5 className="text-uppercase fw-bold mb-3" style={{ color: '#d4580e' }}>
                                <i className="fa-solid fa-id-card me-2" aria-hidden="true" />
                                Datos del cliente
                            </h5>
                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <label className="form-label text-secondary">Nombre completo *</label>
                                    <input className={inputClass} value={form.nombres} onChange={set('nombres')} placeholder="Ingrese su nombre completo..." required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-secondary">Nombre comercial *</label>
                                    <input className={inputClass} value={form.nombre_comercial} onChange={set('nombre_comercial')} placeholder="Ej: Gourmet Fire Pit" required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-secondary">Quién registra *</label>
                                    <input className={inputClass} value={form.registrado_por} onChange={set('registrado_por')} placeholder="Nombre de quien registra..." required />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label text-secondary">Tipo documento *</label>
                                    <select className={selectClass} value={form.tipo_documento} onChange={set('tipo_documento')} required>
                                        <option value="">Seleccionar</option>
                                        <option value="DNI">DNI</option>
                                        <option value="CE">CE</option>
                                        <option value="PASAPORTE">Pasaporte</option>
                                        <option value="RUC">RUC</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label text-secondary">N° documento *</label>
                                    <input className={inputClass} value={form.numero_documento} onChange={set('numero_documento')} placeholder="Ingrese su documento..." required />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label text-secondary">Teléfono *</label>
                                    <input className={inputClass} value={form.telefono} onChange={set('telefono')} placeholder="Ingrese su teléfono..." required />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label text-secondary">Teléfono referencia *</label>
                                    <input className={inputClass} value={form.telefono_referencia} onChange={set('telefono_referencia')} placeholder="Teléfono de referencia..." required />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label text-secondary">Correo *</label>
                                    <input type="email" className={inputClass} value={form.email} onChange={set('email')} placeholder="Ingrese su correo..." required />
                                </div>
                            </div>

                            <h5 className="text-uppercase fw-bold mb-3" style={{ color: '#d4580e' }}>
                                <i className="fa-solid fa-calendar-days me-2" aria-hidden="true" />
                                Fecha, mesa y asientos
                            </h5>
                            <div className="row g-3 mb-4">
                                <div className="col-md-4">
                                    <label className="form-label text-secondary">Fecha *</label>
                                    <input
                                        type="date"
                                        className={inputClass}
                                        value={form.fecha}
                                        onChange={onSelectFecha}
                                        min={hoyISO()}
                                        required
                                    />
                                    <div className="form-text text-secondary">
                                        Solo fechas de hoy en adelante
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label text-secondary">Hora *</label>
                                    <select
                                        className={selectClass}
                                        value={form.hora}
                                        onChange={onSelectHora}
                                        required
                                        disabled={!form.fecha || esFechaPasada(form.fecha)}
                                    >
                                        <option value="">
                                            {form.fecha ? 'Selecciona horario' : 'Primero selecciona la fecha'}
                                        </option>
                                        {horariosDisponibles.map((h) => (
                                            <option key={h.value} value={h.value}>{h.label}</option>
                                        ))}
                                    </select>
                                    <div className="form-text text-secondary">
                                        {form.fecha
                                            ? 'Atención: 08:00 AM a 10:00 PM'
                                            : 'Define la fecha antes de elegir la hora'}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label text-secondary">Comensales *</label>
                                    <input type="number" min="1" max="50" className={inputClass} value={form.comensales} onChange={set('comensales')} placeholder="Ej: 2" required />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label text-secondary">Asientos *</label>
                                    <input type="number" min="1" max="50" className={inputClass} value={form.asientos} onChange={set('asientos')} placeholder="Ej: 2" required />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label text-secondary">Mesa disponible *</label>
                                    <select className={selectClass} value={form.mesa_id} onChange={onSelectMesa} required>
                                        <option value="">Selecciona mesa</option>
                                        {mesas.map((m) => {
                                            const mant = Number(m.estadouso) === 3 || m.en_mantenimiento;
                                            const reservada = !!m.reservada;
                                            const disabled = mant || reservada || m.seleccionable === false;
                                            let extra = '';
                                            if (mant) extra = ' — EN MANTENIMIENTO';
                                            else if (reservada) extra = ' — MESA RESERVADA';
                                            return (
                                                <option key={m.idmesa} value={m.idmesa} disabled={disabled}>
                                                    {m.nombremessa} — {m.ubicacionmesa} ({m.cantidadsillas} asientos){extra}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <div className="form-text text-secondary">
                                        {form.fecha && form.hora
                                            ? `Disponibilidad para ${form.fecha} ${formatHora12(form.hora)}`
                                            : form.fecha
                                                ? 'Ahora selecciona la hora para ver disponibilidad.'
                                                : 'Primero selecciona la fecha y luego la hora.'}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label text-secondary">Método de pago *</label>
                                    <select className={selectClass} value={form.metodo_pago_id} onChange={set('metodo_pago_id')} required>
                                        <option value="">Seleccionar</option>
                                        {metodos.map((m) => (
                                            <option key={m.id} value={m.id}>{m.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label className="form-label text-secondary">Observaciones *</label>
                                    <textarea className={inputClass} rows={2} value={form.descripcion} onChange={set('descripcion')} placeholder="Escriba observaciones..." required />
                                </div>
                            </div>

                            <h5 className="text-uppercase fw-bold mb-3" style={{ color: '#d4580e' }}>
                                <i className="fa-solid fa-utensils me-2" aria-hidden="true" />
                                Platos y bebidas *
                            </h5>
                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <label className="form-label text-secondary">Agregar plato</label>
                                    <select
                                        className={selectClass}
                                        defaultValue=""
                                        onChange={(e) => {
                                            const p = menus.find((x) => String(x.id) === e.target.value);
                                            if (p) addItem('menu', p);
                                            e.target.value = '';
                                        }}
                                    >
                                        <option value="">Seleccionar plato</option>
                                        {menus.map((m) => (
                                            <option key={m.id} value={m.id} disabled={m.agotado || m.stock <= 0}>
                                                {m.nombre} — S/ {Number(m.precio_promo || m.precio).toFixed(2)} {m.stock <= 0 ? '(Agotado)' : `(stock ${m.stock})`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-secondary">Agregar bebida</label>
                                    <select
                                        className={selectClass}
                                        defaultValue=""
                                        onChange={(e) => {
                                            const p = bebidas.find((x) => String(x.id) === e.target.value);
                                            if (p) addItem('bebida', p);
                                            e.target.value = '';
                                        }}
                                    >
                                        <option value="">Seleccionar bebida</option>
                                        {bebidas.map((b) => (
                                            <option key={b.id} value={b.id} disabled={b.agotado || b.stock <= 0}>
                                                {b.nombre} — S/ {Number(b.precio).toFixed(2)} {b.stock <= 0 ? '(Agotado)' : `(stock ${b.stock})`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="table-responsive mb-4">
                                <table className="table table-dark table-borderless align-middle mb-0">
                                    <thead>
                                        <tr className="text-secondary small text-uppercase">
                                            <th>Producto</th>
                                            <th style={{ width: 110 }}>Cant.</th>
                                            <th>Subtotal</th>
                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {form.items.map((item, index) => (
                                            <tr key={`${item.menu_id || item.bebida_id}-${index}`}>
                                                <td>{item.nombre}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max={item.stock || 30}
                                                        className={inputClass}
                                                        value={item.cantidad}
                                                        onChange={(e) => updateCantidad(index, Number(e.target.value))}
                                                        placeholder="Ej: 1"
                                                    />
                                                </td>
                                                <td>S/ {(Number(item.precio) * Number(item.cantidad)).toFixed(2)}</td>
                                                <td>
                                                    <button type="button" className="btn btn-sm btn-outline-light" onClick={() => removeItem(index)}>
                                                        <i className="fa-solid fa-trash" aria-hidden="true" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {form.items.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="text-secondary">Aún no agregaste productos.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
                                <div className="fw-bold" style={{ color: '#d4580e' }}>
                                    Total estimado: S/ {total.toFixed(2)}
                                </div>
                                <button type="submit" className="btn btn-light rounded-3 text-uppercase fw-bold px-4" disabled={loading}>
                                    {loading ? 'Enviando...' : 'Confirmar reserva'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="rounded-4 p-4 h-100" style={{ backgroundColor: '#1a1a1a' }}>
                            <h5 className="text-uppercase fw-bold mb-3" style={{ color: '#d4580e' }}>
                                <i className="fa-solid fa-circle-info me-2" aria-hidden="true" />
                                Información
                            </h5>
                            <ul className="text-secondary small ps-3 mb-0">
                                <li className="mb-2">Horario de atención: 08:00 AM a 10:00 PM.</li>
                                <li className="mb-2">Si la mesa ya tiene reserva en ese horario, verás &quot;Mesa reservada&quot;.</li>
                                <li className="mb-2">Las mesas en mantenimiento no se pueden seleccionar.</li>
                                <li>Puedes revisar tus reservas en Mi cuenta.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
