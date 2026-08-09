import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import api from '../../api/client';
import CrudPage from './CrudPage';
import { darkControl, darkLabel } from './formDark';

const emptyForm = {
  nombres: '',
  nombre_comercial: 'Gourmet Fire Pit',
  registrado_por: '',
  tipo_documento: 'DNI',
  numero_documento: '',
  email: '',
  telefono: '',
  telefono_referencia: '',
  fecha_hora: '',
  carta: 'menus',
  comensales: 2,
  asientos: 2,
  descripcion: '',
  plato: '',
  sucursal: 'Gourmet Fire Pit - Los Olivos',
  estado: 'pendiente',
  mesa_id: '',
  metodo_pago_id: '',
};

const Reservas = () => {
  const [mesas, setMesas] = useState([]);
  const [metodos, setMetodos] = useState([]);

  useEffect(() => {
    api.get('/mesas').then(({ data }) => setMesas(data || [])).catch(() => {});
    api.get('/metodos-pago', { params: { solo_activos: 0 } }).then(({ data }) => setMetodos(data || [])).catch(() => {});
  }, []);

  return (
    <CrudPage
      title="Reservas"
      newLabel="+ Nueva reserva"
      searchPlaceholder="Buscar reserva..."
      emptyForm={emptyForm}
      fetchList={async (q) => (await api.get('/admin/reservas', { params: { q } })).data}
      onCreate={async (form) => api.post('/admin/reservas', {
        ...form,
        mesa_id: Number(form.mesa_id),
        metodo_pago_id: form.metodo_pago_id ? Number(form.metodo_pago_id) : null,
        items: form.plato
          ? undefined
          : undefined,
      })}
      onUpdate={async (row, form) => api.put(`/admin/reservas/${row.id}`, {
        ...form,
        mesa_id: form.mesa_id ? Number(form.mesa_id) : null,
        metodo_pago_id: form.metodo_pago_id ? Number(form.metodo_pago_id) : null,
      })}
      onDelete={async (row) => api.delete(`/admin/reservas/${row.id}`)}
      mapRow={(row) => ({
        nombres: row.nombres,
        nombre_comercial: row.nombre_comercial || '',
        registrado_por: row.registrado_por || '',
        tipo_documento: row.tipo_documento || 'DNI',
        numero_documento: row.numero_documento || '',
        email: row.email || '',
        telefono: row.telefono || '',
        telefono_referencia: row.telefono_referencia || '',
        fecha_hora: row.fecha_hora ? String(row.fecha_hora).slice(0, 16).replace(' ', 'T') : '',
        carta: row.carta || 'menus',
        comensales: row.comensales,
        asientos: row.asientos || row.comensales,
        descripcion: row.descripcion || '',
        plato: row.plato || '',
        sucursal: row.sucursal || '',
        estado: row.estado,
        mesa_id: row.mesa_id || '',
        metodo_pago_id: row.metodo_pago_id || '',
      })}
      columns={[
        { key: 'id', label: '#' },
        { key: 'nombres', label: 'Cliente' },
        { key: 'documento', label: 'Documento', render: (r) => `${r.tipo_documento || ''} ${r.numero_documento || ''}`.trim() },
        { key: 'mesa', label: 'Mesa', render: (r) => r.mesa?.nombremessa || '—' },
        { key: 'plato', label: 'Pedido', render: (r) => r.plato || (r.platos || []).map((p) => p.nombre_item).join(', ') },
        { key: 'fecha_hora', label: 'Fecha', render: (r) => new Date(r.fecha_hora).toLocaleString('es-PE') },
        { key: 'estado', label: 'Estado' },
      ]}
      renderFields={(form, setForm) => (
        <div className="row g-2">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>Nombres</Form.Label>
              <Form.Control className={darkControl} value={form.nombres} onChange={(e) => setForm({ ...form, nombres: e.target.value })} placeholder="Ingrese el nombre completo..." required />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>Nombre comercial</Form.Label>
              <Form.Control className={darkControl} value={form.nombre_comercial} onChange={(e) => setForm({ ...form, nombre_comercial: e.target.value })} placeholder="Ej: Gourmet Fire Pit" />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>Registrado por</Form.Label>
              <Form.Control className={darkControl} value={form.registrado_por} onChange={(e) => setForm({ ...form, registrado_por: e.target.value })} placeholder="Nombre de quien registra..." />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>Fecha y hora</Form.Label>
              <Form.Control className={darkControl} type="datetime-local" value={form.fecha_hora} onChange={(e) => setForm({ ...form, fecha_hora: e.target.value })} required />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>Tipo doc.</Form.Label>
              <Form.Select className={darkControl} value={form.tipo_documento} onChange={(e) => setForm({ ...form, tipo_documento: e.target.value })}>
                <option value="DNI">DNI</option>
                <option value="CE">CE</option>
                <option value="PASAPORTE">Pasaporte</option>
                <option value="RUC">RUC</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>N° documento</Form.Label>
              <Form.Control className={darkControl} value={form.numero_documento} onChange={(e) => setForm({ ...form, numero_documento: e.target.value })} placeholder="Ingrese el documento..." required />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>Email</Form.Label>
              <Form.Control className={darkControl} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Ingrese el correo..." required />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>Teléfono</Form.Label>
              <Form.Control className={darkControl} value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="Ingrese el teléfono..." required />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>Teléfono referencia</Form.Label>
              <Form.Control className={darkControl} value={form.telefono_referencia} onChange={(e) => setForm({ ...form, telefono_referencia: e.target.value })} placeholder="Teléfono de referencia..." />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>Plato / pedido</Form.Label>
              <Form.Control className={darkControl} value={form.plato} onChange={(e) => setForm({ ...form, plato: e.target.value })} placeholder="Ej: Lomo saltado x2..." />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>Mesa</Form.Label>
              <Form.Select className={darkControl} value={form.mesa_id} onChange={(e) => setForm({ ...form, mesa_id: e.target.value })} required>
                <option value="">Seleccionar</option>
                {mesas.map((m) => {
                  const mant = Number(m.estadouso) === 3 || m.en_mantenimiento;
                  return (
                    <option key={m.idmesa} value={m.idmesa} disabled={mant}>
                      {m.nombremessa} ({m.cantidadsillas} asientos){mant ? ' — EN MANTENIMIENTO' : ''}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>Método de pago</Form.Label>
              <Form.Select className={darkControl} value={form.metodo_pago_id} onChange={(e) => setForm({ ...form, metodo_pago_id: e.target.value })}>
                <option value="">Seleccionar</option>
                {metodos.map((m) => (
                  <option key={m.id} value={m.id}>{m.nombre}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>Comensales</Form.Label>
              <Form.Control className={darkControl} type="number" min="1" value={form.comensales} onChange={(e) => setForm({ ...form, comensales: e.target.value })} placeholder="Ej: 2" required />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>Asientos</Form.Label>
              <Form.Control className={darkControl} type="number" min="1" value={form.asientos} onChange={(e) => setForm({ ...form, asientos: e.target.value })} placeholder="Ej: 2" />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className={darkLabel}>Estado</Form.Label>
              <Form.Select className={darkControl} value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="rechazada">Rechazada</option>
                <option value="cancelada">Cancelada</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-0">
              <Form.Label className={darkLabel}>Descripción</Form.Label>
              <Form.Control className={darkControl} as="textarea" rows={2} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} placeholder="Escriba observaciones (opcional)..." />
            </Form.Group>
          </div>
        </div>
      )}
    />
  );
};

export default Reservas;
