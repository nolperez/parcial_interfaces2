import React from 'react';
import { Form } from 'react-bootstrap';
import api from '../../api/client';
import CrudPage from './CrudPage';
import { darkControl, darkLabel } from './formDark';

const emptyForm = {
  _isNew: true,
  name: '',
  apellidos: '',
  tipo_documento: 'DNI',
  numero_documento: '',
  email: '',
  password: '',
  telefono: '',
  direccion: '',
  ciudad: '',
  fecha_nacimiento: '',
  genero: '',
  role: 'cliente',
  estado: 'activo',
  preferencias_alimentarias: '',
  preferencias_asiento: '',
  metodos_pago: '',
  notas: '',
};

const Usuarios = () => (
  <CrudPage
    title="Usuarios"
    newLabel="+ Nuevo usuario"
    searchPlaceholder="Buscar usuario..."
    uniqueFields={[
      { key: 'email', label: 'correo' },
      { key: 'numero_documento', label: 'número de documento' },
    ]}
    emptyForm={emptyForm}
    fetchList={async (q) => (await api.get('/admin/usuarios', { params: { q } })).data}
    onCreate={async (form) => {
      const payload = { ...form };
      delete payload._isNew;
      return api.post('/admin/usuarios', payload);
    }}
    onUpdate={async (row, form) => {
      const payload = { ...form };
      delete payload._isNew;
      if (!payload.password) delete payload.password;
      return api.put(`/admin/usuarios/${row.id}`, payload);
    }}
    onDelete={async (row) => api.delete(`/admin/usuarios/${row.id}`)}
    mapRow={(row) => ({
      _isNew: false,
      name: row.name,
      apellidos: row.apellidos || '',
      tipo_documento: row.tipo_documento || 'DNI',
      numero_documento: row.numero_documento || '',
      email: row.email,
      password: '',
      telefono: row.telefono || '',
      direccion: row.direccion || '',
      ciudad: row.ciudad || '',
      fecha_nacimiento: row.fecha_nacimiento ? String(row.fecha_nacimiento).slice(0, 10) : '',
      genero: row.genero || '',
      role: row.role,
      estado: row.estado,
      preferencias_alimentarias: row.preferencias_alimentarias || '',
      preferencias_asiento: row.preferencias_asiento || '',
      metodos_pago: row.metodos_pago || '',
      notas: row.notas || '',
    })}
    columns={[
      { key: 'id', label: '#' },
      { key: 'nombre', label: 'Nombre', render: (r) => `${r.name || ''} ${r.apellidos || ''}`.trim() },
      { key: 'documento', label: 'Documento', render: (r) => `${r.tipo_documento || ''} ${r.numero_documento || ''}`.trim() },
      { key: 'role', label: 'Rol', render: (r) => String(r.role || '').toUpperCase() },
      { key: 'estado', label: 'Estado' },
      { key: 'email', label: 'Email' },
      { key: 'telefono', label: 'Teléfono' },
    ]}
    renderFields={(form, setForm) => (
      <div className="row g-2">
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Nombre</Form.Label>
            <Form.Control className={darkControl} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ingrese el nombre..." required />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Apellidos</Form.Label>
            <Form.Control className={darkControl} value={form.apellidos} onChange={(e) => setForm({ ...form, apellidos: e.target.value })} placeholder="Ingrese los apellidos..." />
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
            <Form.Control className={darkControl} value={form.numero_documento} onChange={(e) => setForm({ ...form, numero_documento: e.target.value })} placeholder="Ingrese el documento..." />
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
            <Form.Label className={darkLabel}>Contraseña {form.password === '' ? '(vacío al editar)' : ''}</Form.Label>
            <Form.Control className={darkControl} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="****************" required={form._isNew === true} />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Teléfono</Form.Label>
            <Form.Control className={darkControl} value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="Ingrese el teléfono..." />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Ciudad</Form.Label>
            <Form.Control className={darkControl} value={form.ciudad} onChange={(e) => setForm({ ...form, ciudad: e.target.value })} placeholder="Ingrese la ciudad..." />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Dirección</Form.Label>
            <Form.Control className={darkControl} value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} placeholder="Ingrese la dirección..." />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Fecha nacimiento</Form.Label>
            <Form.Control className={darkControl} type="date" value={form.fecha_nacimiento} onChange={(e) => setForm({ ...form, fecha_nacimiento: e.target.value })} />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Género</Form.Label>
            <Form.Select className={darkControl} value={form.genero} onChange={(e) => setForm({ ...form, genero: e.target.value })}>
              <option value="">—</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
              <option value="prefiero_no_decir">Prefiero no decir</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Rol</Form.Label>
            <Form.Select className={darkControl} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="cliente">Cliente</option>
              <option value="admin">Admin</option>
              <option value="mesero">Mesero</option>
              <option value="cocina">Cocina</option>
              <option value="cajero">Cajero</option>
              <option value="recepcion">Recepción</option>
              <option value="host">Host</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Estado</Form.Label>
            <Form.Select className={darkControl} value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Preferencias alimentarias</Form.Label>
            <Form.Control className={darkControl} value={form.preferencias_alimentarias} onChange={(e) => setForm({ ...form, preferencias_alimentarias: e.target.value })} placeholder="Ej: Sin gluten, vegetariano..." />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Preferencias de asiento</Form.Label>
            <Form.Control className={darkControl} value={form.preferencias_asiento} onChange={(e) => setForm({ ...form, preferencias_asiento: e.target.value })} placeholder="Ej: Cerca a la ventana..." />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-0">
            <Form.Label className={darkLabel}>Métodos de pago</Form.Label>
            <Form.Control className={darkControl} as="textarea" rows={2} value={form.metodos_pago} onChange={(e) => setForm({ ...form, metodos_pago: e.target.value })} placeholder="Ej: VISA ****1234, Yape..." />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-0">
            <Form.Label className={darkLabel}>Notas</Form.Label>
            <Form.Control className={darkControl} as="textarea" rows={2} value={form.notas} onChange={(e) => setForm({ ...form, notas: e.target.value })} placeholder="Escriba notas adicionales..." />
          </Form.Group>
        </div>
      </div>
    )}
  />
);

export default Usuarios;
