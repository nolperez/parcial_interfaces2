import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Button, Form, Modal, Spinner } from 'react-bootstrap';
import api from '../../api/client';
import { useUI } from '../../context/UIContext';
import { getApiErrorMessage, swalConfirm, validateRequiredForm, validateUniqueFields } from '../../utils/swal';
import { HORARIOS_RESERVA, formatHora12 } from '../../utils/horarios';
import { darkControl, darkLabel } from './formDark';
import AdminPagination, { useAdminPagination } from './AdminPagination';

const ESTADO = {
  LIBRE: 1,
  OCUPADO: 2,
  MANTENIMIENTO: 3,
};

const emptyForm = {
  codigoinventario: '',
  nombremessa: '',
  descripcionmesa: '',
  ubicacionmesa: '',
  cantidadsillas: 4,
  estadouso: ESTADO.LIBRE,
};

const hoyISO = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const emptyOcupar = () => ({
  user_id: '',
  fecha: hoyISO(),
  tipo: 'unico',
  hora: '12:00',
  comensales: 2,
  asientos: 2,
  metodo_pago_id: '',
  telefono_referencia: '',
  descripcion: '',
  items: [],
});

const estadoMeta = (estadouso) => {
  const n = Number(estadouso);
  if (n === ESTADO.MANTENIMIENTO) {
    return { key: 'mantenimiento', label: 'En mantenimiento', className: 'is-mantenimiento', colorClass: 'text-warning' };
  }
  if (n === ESTADO.OCUPADO) {
    return { key: 'ocupado', label: 'Ocupado', className: 'is-ocupada', colorClass: 'text-secondary' };
  }
  return { key: 'libre', label: 'Libre', className: '', colorClass: 'admin-accent' };
};

const Mesas = () => {
  const { success, error: notifyError } = useUI();
  const [mesas, setMesas] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [clientes, setClientes] = useState([]);
  const [menus, setMenus] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [metodos, setMetodos] = useState([]);

  const [showOcupar, setShowOcupar] = useState(false);
  const [mesaOcupar, setMesaOcupar] = useState(null);
  const [ocuparForm, setOcuparForm] = useState(emptyOcupar);
  const [ocupando, setOcupando] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/mesas', { params: { q } });
      setMesas(data);
    } catch (err) {
      notifyError(getApiErrorMessage(err, 'No se pudieron cargar las mesas'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    Promise.all([
      api.get('/admin/usuarios', { params: { role: 'cliente' } }),
      api.get('/menus', { params: { solo_disponibles: 1 } }),
      api.get('/bebidas', { params: { solo_disponibles: 1 } }),
      api.get('/metodos-pago'),
    ]).then(([u, m, b, p]) => {
      setClientes(u.data || []);
      setMenus(m.data || []);
      setBebidas(b.data || []);
      setMetodos(p.data || []);
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return mesas;
    const term = q.toLowerCase();
    return mesas.filter((m) => JSON.stringify(m).toLowerCase().includes(term));
  }, [mesas, q]);

  const pagination = useAdminPagination(filtered, 8, q);

  const totalPedido = useMemo(
    () => ocuparForm.items.reduce((acc, it) => acc + Number(it.precio || 0) * Number(it.cantidad || 1), 0),
    [ocuparForm.items]
  );

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShow(true);
  };

  const openEdit = (mesa) => {
    setEditing(mesa);
    setForm({
      codigoinventario: mesa.codigoinventario,
      nombremessa: mesa.nombremessa,
      descripcionmesa: mesa.descripcionmesa,
      ubicacionmesa: mesa.ubicacionmesa,
      cantidadsillas: mesa.cantidadsillas,
      estadouso: mesa.estadouso,
    });
    setShow(true);
  };

  const save = async (e) => {
    e.preventDefault();
    if (!validateRequiredForm(e.currentTarget)) return;
    if (!validateUniqueFields(
      form,
      mesas,
      [
        { key: 'codigoinventario', label: 'código de inventario' },
        { key: 'nombremessa', label: 'nombre de mesa' },
      ],
      editing
    )) return;
    try {
      if (editing) await api.put(`/admin/mesas/${editing.idmesa}`, form);
      else await api.post('/admin/mesas', form);
      setShow(false);
      success(editing ? 'Mesa actualizada' : 'Mesa creada');
      await load();
    } catch (err) {
      notifyError(getApiErrorMessage(err, 'No se pudo guardar la mesa'));
    }
  };

  const setEstado = async (mesa, estadouso, mensaje) => {
    try {
      await api.put(`/admin/mesas/${mesa.idmesa}`, { estadouso });
      success(mensaje);
      await load();
    } catch (err) {
      notifyError(getApiErrorMessage(err, 'No se pudo actualizar la mesa'));
    }
  };

  const openOcupar = (mesa) => {
    setMesaOcupar(mesa);
    setOcuparForm({
      ...emptyOcupar(),
      comensales: Math.min(2, Number(mesa.cantidadsillas) || 2),
      asientos: Math.min(2, Number(mesa.cantidadsillas) || 2),
    });
    setShowOcupar(true);
  };

  const onSelectCliente = (e) => {
    const userId = e.target.value;
    const cliente = clientes.find((c) => String(c.id) === String(userId));
    setOcuparForm((prev) => ({
      ...prev,
      user_id: userId,
      telefono_referencia: prev.telefono_referencia || cliente?.telefono || '',
    }));
  };

  const addItem = (tipo, producto) => {
    if (!producto || producto.agotado || Number(producto.stock) <= 0) {
      notifyError('Producto agotado');
      return;
    }
    setOcuparForm((prev) => {
      const keyId = tipo === 'menu' ? 'menu_id' : 'bebida_id';
      const id = producto.id;
      const exists = prev.items.find((x) => x[keyId] === id);
      if (exists) {
        return {
          ...prev,
          items: prev.items.map((x) => (
            x[keyId] === id ? { ...x, cantidad: Number(x.cantidad) + 1 } : x
          )),
        };
      }
      return {
        ...prev,
        items: [
          ...prev.items,
          {
            menu_id: tipo === 'menu' ? id : null,
            bebida_id: tipo === 'bebida' ? id : null,
            nombre: producto.nombre,
            precio: Number(producto.precio_promo || producto.precio),
            cantidad: 1,
          },
        ],
      };
    });
  };

  const removeItem = (index) => {
    setOcuparForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const confirmarOcupar = async (e) => {
    e.preventDefault();
    if (!mesaOcupar) return;
    if (!ocuparForm.user_id) {
      notifyError('Selecciona el cliente');
      return;
    }
    if (ocuparForm.tipo === 'unico' && !ocuparForm.hora) {
      notifyError('Selecciona un horario');
      return;
    }
    if (!ocuparForm.metodo_pago_id) {
      notifyError('Selecciona el método de pago');
      return;
    }
    if (!ocuparForm.descripcion.trim()) {
      notifyError('Ingresa las observaciones');
      return;
    }
    if (ocuparForm.items.length === 0) {
      notifyError('Agrega al menos un plato o bebida');
      return;
    }

    setOcupando(true);
    try {
      const payload = {
        user_id: Number(ocuparForm.user_id),
        fecha: ocuparForm.fecha,
        tipo: ocuparForm.tipo,
        ...(ocuparForm.tipo === 'unico' ? { hora: ocuparForm.hora } : {}),
        comensales: Number(ocuparForm.comensales),
        asientos: Number(ocuparForm.asientos),
        metodo_pago_id: Number(ocuparForm.metodo_pago_id),
        telefono_referencia: ocuparForm.telefono_referencia || undefined,
        descripcion: ocuparForm.descripcion,
        items: ocuparForm.items.map((it) => ({
          menu_id: it.menu_id,
          bebida_id: it.bebida_id,
          cantidad: Number(it.cantidad),
        })),
      };
      const { data } = await api.post(`/admin/mesas/${mesaOcupar.idmesa}/ocupar`, payload);
      setShowOcupar(false);
      setMesaOcupar(null);
      success(data.message || 'Mesa ocupada y reserva creada');
      await load();
    } catch (err) {
      notifyError(getApiErrorMessage(err, 'No se pudo ocupar la mesa'));
    } finally {
      setOcupando(false);
    }
  };

  const liberarMesa = async (mesa) => {
    const ok = await swalConfirm(
      'Se liberará la mesa y se cancelarán las reservas activas asociadas.',
      '¿Liberar mesa?'
    );
    if (!ok) return;
    try {
      const { data } = await api.post(`/admin/mesas/${mesa.idmesa}/liberar`);
      success(data.message || 'Mesa liberada');
      await load();
    } catch (err) {
      notifyError(getApiErrorMessage(err, 'No se pudo liberar la mesa'));
    }
  };

  const toggleLibreOcupado = async (mesa) => {
    if (Number(mesa.estadouso) === ESTADO.MANTENIMIENTO) return;
    if (Number(mesa.estadouso) === ESTADO.LIBRE) {
      openOcupar(mesa);
      return;
    }
    await liberarMesa(mesa);
  };

  const toggleMantenimiento = async (mesa) => {
    const enMant = Number(mesa.estadouso) === ESTADO.MANTENIMIENTO;
    if (!enMant) {
      const ok = await swalConfirm(
        'La mesa no podrá seleccionarse en reservas mientras esté en mantenimiento.',
        '¿Pasar a mantenimiento?'
      );
      if (!ok) return;
      await setEstado(mesa, ESTADO.MANTENIMIENTO, 'Mesa en mantenimiento');
      return;
    }
    await setEstado(mesa, ESTADO.LIBRE, 'Mesa fuera de mantenimiento');
  };

  const remove = async (mesa) => {
    const ok = await swalConfirm('Esta acción no se puede deshacer.', '¿Eliminar mesa?');
    if (!ok) return;
    try {
      await api.delete(`/admin/mesas/${mesa.idmesa}`);
      success('Mesa eliminada');
      await load();
    } catch (err) {
      notifyError(getApiErrorMessage(err, 'No se pudo eliminar la mesa'));
    }
  };

  const etiquetaOcupacion = (mesa) => {
    const occ = mesa.ocupacion;
    if (!occ?.etiqueta) return null;
    if (occ.tipo === 'parcial' && occ.horarios?.length) {
      return `Ocupada: ${occ.horarios.map(formatHora12).join(', ')}`;
    }
    return occ.etiqueta;
  };

  const clienteLabel = (c) => {
    const nombre = `${c.name || ''} ${c.apellidos || ''}`.trim();
    return `${nombre || c.email}${c.numero_documento ? ` — ${c.numero_documento}` : ''}`;
  };

  return (
    <div className="text-white">
      <div className="admin-band d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
        <h3 className="fw-bold mb-0 text-uppercase h4">Reserva de mesas</h3>
        <Button className="btn-light rounded-3 text-uppercase fw-bold align-self-start" onClick={openCreate}>
          + Nueva mesa
        </Button>
      </div>

      <div className="admin-panel p-2 px-3 mb-3">
        <Form onSubmit={(e) => { e.preventDefault(); load(); }}>
          <Form.Control
            type="search"
            placeholder="Buscar mesa..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="admin-input rounded-3"
            size="sm"
          />
        </Form>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" style={{ color: '#d4580e' }} />
        </div>
      ) : (
        <>
          <Row className="g-3 g-md-4">
            {pagination.pageItems.map((mesa) => {
              const meta = estadoMeta(mesa.estadouso);
              const enMant = meta.key === 'mantenimiento';
              const libre = meta.key === 'libre';
              const occLabel = etiquetaOcupacion(mesa);
              return (
                <Col key={mesa.idmesa} xs={6} md={4} lg={3}>
                  <div
                    className={`admin-mesa-card text-center p-3 p-md-4 h-100 ${meta.className}`}
                    style={{ minHeight: 190 }}
                    role="button"
                    tabIndex={0}
                    onClick={() => openEdit(mesa)}
                    onKeyDown={(e) => e.key === 'Enter' && openEdit(mesa)}
                  >
                    <span className="fw-bold fs-5 text-white d-block">{mesa.nombremessa}</span>
                    <small className={`mt-2 d-block text-uppercase fw-semibold ${meta.colorClass}`}>
                      {enMant && <i className="fa-solid fa-screwdriver-wrench me-1" aria-hidden="true" />}
                      {meta.label}
                    </small>
                    <small className="text-secondary d-block mt-1">{mesa.ubicacionmesa}</small>
                    <small className="text-secondary d-block mt-1">
                      <i className="fa-solid fa-clock me-1" aria-hidden="true" />
                      {occLabel || '08:00 AM - 10:00 PM'}
                    </small>
                    <div className="d-flex flex-wrap gap-2 mt-3 justify-content-center" onClick={(e) => e.stopPropagation()}>
                      {!enMant && (
                        <Button
                          size="sm"
                          className="btn-outline-light rounded-3"
                          onClick={() => toggleLibreOcupado(mesa)}
                        >
                          {libre ? 'Ocupar' : 'Liberar'}
                        </Button>
                      )}
                      <Button
                        size="sm"
                        className={`rounded-3 ${enMant ? 'btn-warning text-dark' : 'btn-outline-warning'}`}
                        onClick={() => toggleMantenimiento(mesa)}
                        title={enMant ? 'Salir de mantenimiento' : 'Pasar a mantenimiento'}
                      >
                        <i className={`fa-solid ${enMant ? 'fa-check' : 'fa-screwdriver-wrench'}`} aria-hidden="true" />
                        <span className="ms-1 d-none d-sm-inline">{enMant ? 'Activar' : 'Mant.'}</span>
                      </Button>
                      <Button
                        size="sm"
                        className="admin-btn-cancel rounded-3"
                        onClick={() => remove(mesa)}
                      >
                        <i className="fa-solid fa-trash" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </Col>
              );
            })}
            {pagination.total === 0 && (
              <Col xs={12}>
                <div className="admin-panel p-5 text-center text-secondary">No hay mesas registradas</div>
              </Col>
            )}
          </Row>
          <AdminPagination {...pagination} />
        </>
      )}

      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        dialogClassName="admin-modal-dialog"
        contentClassName="admin-modal-content border-0"
      >
        <Form onSubmit={save} noValidate>
          <Modal.Header closeButton closeVariant="white">
            <Modal.Title className="text-uppercase fw-bold mb-0">
              {editing ? 'Editar mesa' : 'Nueva mesa'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row g-2">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className={darkLabel}>Código inventario</Form.Label>
                  <Form.Control className={darkControl} value={form.codigoinventario} onChange={(e) => setForm({ ...form, codigoinventario: e.target.value })} placeholder="Ej: MESA-01" required maxLength={10} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className={darkLabel}>Nombre</Form.Label>
                  <Form.Control className={darkControl} value={form.nombremessa} onChange={(e) => setForm({ ...form, nombremessa: e.target.value })} placeholder="Ej: Mesa 1" required maxLength={10} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className={darkLabel}>Descripción</Form.Label>
                  <Form.Control className={darkControl} value={form.descripcionmesa} onChange={(e) => setForm({ ...form, descripcionmesa: e.target.value })} placeholder="Ingrese la descripción..." required />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className={darkLabel}>Ubicación</Form.Label>
                  <Form.Control className={darkControl} value={form.ubicacionmesa} onChange={(e) => setForm({ ...form, ubicacionmesa: e.target.value })} placeholder="Ej: Terraza, Salón..." required />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-0">
                  <Form.Label className={darkLabel}>Sillas</Form.Label>
                  <Form.Control className={darkControl} type="number" min="1" value={form.cantidadsillas} onChange={(e) => setForm({ ...form, cantidadsillas: e.target.value })} placeholder="Ej: 4" required />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-0">
                  <Form.Label className={darkLabel}>Estado</Form.Label>
                  <Form.Select className={darkControl} value={form.estadouso} onChange={(e) => setForm({ ...form, estadouso: Number(e.target.value) })}>
                    <option value={ESTADO.LIBRE}>Libre</option>
                    <option value={ESTADO.OCUPADO}>Ocupado</option>
                    <option value={ESTADO.MANTENIMIENTO}>En mantenimiento</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="row g-2 w-100 m-0">
              <div className="col-6">
                <Button type="button" size="sm" className="admin-btn-cancel w-100" onClick={() => setShow(false)}>
                  Cancelar
                </Button>
              </div>
              <div className="col-6">
                <Button type="submit" size="sm" className="btn-light w-100 fw-bold">
                  Guardar
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={showOcupar}
        onHide={() => !ocupando && setShowOcupar(false)}
        centered
        size="lg"
        scrollable
        dialogClassName="admin-modal-dialog"
        contentClassName="admin-modal-content border-0"
      >
        <Form onSubmit={confirmarOcupar}>
          <Modal.Header closeButton closeVariant="white">
            <Modal.Title className="text-uppercase fw-bold mb-0">
              Ocupar {mesaOcupar?.nombremessa || 'mesa'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-secondary small mb-3">
              Completa cliente, horario, pedido y pago. Se creará una reserva confirmada visible en Mis Reservas del cliente.
            </p>

            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>Cliente *</Form.Label>
              <Form.Select className={darkControl} value={ocuparForm.user_id} onChange={onSelectCliente} required>
                <option value="">Selecciona cliente</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>{clienteLabel(c)}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="row g-2">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className={darkLabel}>Fecha *</Form.Label>
                  <Form.Control
                    className={darkControl}
                    type="date"
                    min={hoyISO()}
                    value={ocuparForm.fecha}
                    onChange={(e) => setOcuparForm({ ...ocuparForm, fecha: e.target.value })}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className={darkLabel}>Teléfono referencia</Form.Label>
                  <Form.Control
                    className={darkControl}
                    value={ocuparForm.telefono_referencia}
                    onChange={(e) => setOcuparForm({ ...ocuparForm, telefono_referencia: e.target.value })}
                    placeholder="Opcional"
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>Tipo de ocupación *</Form.Label>
              <div className="d-flex flex-column gap-2">
                <Form.Check
                  type="radio"
                  id="ocupar-unico"
                  name="tipoOcupacion"
                  label="Un solo horario"
                  checked={ocuparForm.tipo === 'unico'}
                  onChange={() => setOcuparForm({ ...ocuparForm, tipo: 'unico' })}
                  className="text-white"
                />
                <Form.Check
                  type="radio"
                  id="ocupar-completo"
                  name="tipoOcupacion"
                  label="Horario completo (08:00 AM – 10:00 PM)"
                  checked={ocuparForm.tipo === 'completo'}
                  onChange={() => setOcuparForm({ ...ocuparForm, tipo: 'completo' })}
                  className="text-white"
                />
              </div>
            </Form.Group>

            {ocuparForm.tipo === 'unico' && (
              <Form.Group className="mb-3">
                <Form.Label className={darkLabel}>Horario *</Form.Label>
                <Form.Select
                  className={darkControl}
                  value={ocuparForm.hora}
                  onChange={(e) => setOcuparForm({ ...ocuparForm, hora: e.target.value })}
                  required
                >
                  {HORARIOS_RESERVA.map((h) => (
                    <option key={h.value} value={h.value}>{h.label}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            <div className="row g-2">
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label className={darkLabel}>Comensales *</Form.Label>
                  <Form.Control
                    className={darkControl}
                    type="number"
                    min="1"
                    max={mesaOcupar?.cantidadsillas || 50}
                    value={ocuparForm.comensales}
                    onChange={(e) => setOcuparForm({ ...ocuparForm, comensales: e.target.value })}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label className={darkLabel}>Asientos *</Form.Label>
                  <Form.Control
                    className={darkControl}
                    type="number"
                    min="1"
                    max={mesaOcupar?.cantidadsillas || 50}
                    value={ocuparForm.asientos}
                    onChange={(e) => setOcuparForm({ ...ocuparForm, asientos: e.target.value })}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label className={darkLabel}>Método de pago *</Form.Label>
                  <Form.Select
                    className={darkControl}
                    value={ocuparForm.metodo_pago_id}
                    onChange={(e) => setOcuparForm({ ...ocuparForm, metodo_pago_id: e.target.value })}
                    required
                  >
                    <option value="">Seleccionar</option>
                    {metodos.map((m) => (
                      <option key={m.id} value={m.id}>{m.nombre}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>Observaciones *</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                className={darkControl}
                value={ocuparForm.descripcion}
                onChange={(e) => setOcuparForm({ ...ocuparForm, descripcion: e.target.value })}
                placeholder="Observaciones de la reserva..."
                required
              />
            </Form.Group>

            <h6 className="text-uppercase fw-bold mb-2" style={{ color: '#d4580e' }}>Pedido *</h6>
            <div className="row g-2 mb-2">
              <div className="col-md-6">
                <Form.Select
                  className={darkControl}
                  defaultValue=""
                  onChange={(e) => {
                    const p = menus.find((x) => String(x.id) === e.target.value);
                    if (p) addItem('menu', p);
                    e.target.value = '';
                  }}
                >
                  <option value="">Agregar plato</option>
                  {menus.map((m) => (
                    <option key={m.id} value={m.id} disabled={m.agotado || m.stock <= 0}>
                      {m.nombre} — S/ {Number(m.precio_promo || m.precio).toFixed(2)}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Select
                  className={darkControl}
                  defaultValue=""
                  onChange={(e) => {
                    const p = bebidas.find((x) => String(x.id) === e.target.value);
                    if (p) addItem('bebida', p);
                    e.target.value = '';
                  }}
                >
                  <option value="">Agregar bebida</option>
                  {bebidas.map((b) => (
                    <option key={b.id} value={b.id} disabled={b.agotado || b.stock <= 0}>
                      {b.nombre} — S/ {Number(b.precio).toFixed(2)}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>

            {ocuparForm.items.length === 0 ? (
              <p className="text-secondary small mb-0">Aún no hay productos en el pedido.</p>
            ) : (
              <ul className="list-unstyled mb-0">
                {ocuparForm.items.map((it, idx) => (
                  <li key={`${it.menu_id || it.bebida_id}-${idx}`} className="d-flex justify-content-between align-items-center border-bottom border-secondary border-opacity-25 py-2">
                    <span>
                      {it.nombre} × {it.cantidad}
                      <small className="text-secondary ms-2">S/ {(Number(it.precio) * Number(it.cantidad)).toFixed(2)}</small>
                    </span>
                    <Button size="sm" variant="outline-danger" onClick={() => removeItem(idx)}>Quitar</Button>
                  </li>
                ))}
                <li className="pt-2 fw-bold text-end">Total: S/ {totalPedido.toFixed(2)}</li>
              </ul>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="row g-2 w-100 m-0">
              <div className="col-6">
                <Button
                  type="button"
                  size="sm"
                  className="admin-btn-cancel w-100"
                  disabled={ocupando}
                  onClick={() => setShowOcupar(false)}
                >
                  Cancelar
                </Button>
              </div>
              <div className="col-6">
                <Button type="submit" size="sm" className="btn-light w-100 fw-bold" disabled={ocupando}>
                  {ocupando ? 'Ocupando…' : 'Confirmar ocupación'}
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Mesas;
