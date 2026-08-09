import React from 'react';
import { Form } from 'react-bootstrap';
import api from '../../api/client';
import CrudPage, { money } from './CrudPage';
import { darkControl, darkLabel } from './formDark';

const emptyForm = {
  nombre: '',
  subtitulo: '',
  descripcion: '',
  imagen: '',
  etiqueta: '',
  precio: '',
  estado: 'disponible',
};

const Promos = () => (
  <CrudPage
    title="Promos"
    newLabel="+ Nueva promo"
    searchPlaceholder="Buscar promo..."
    uniqueFields={[{ key: 'nombre', label: 'nombre de promo' }]}
    emptyForm={emptyForm}
    fetchList={async (q) => (await api.get('/admin/promos', { params: { q } })).data}
    onCreate={async (form) => api.post('/admin/promos', form)}
    onUpdate={async (row, form) => api.put(`/admin/promos/${row.id}`, form)}
    onDelete={async (row) => api.delete(`/admin/promos/${row.id}`)}
    mapRow={(row) => ({
      nombre: row.nombre,
      subtitulo: row.subtitulo || '',
      descripcion: row.descripcion || '',
      imagen: row.imagen || '',
      etiqueta: row.etiqueta || '',
      precio: row.precio,
      estado: row.estado,
    })}
    columns={[
      { key: 'id', label: '#' },
      { key: 'nombre', label: 'Nombre' },
      { key: 'precio', label: 'Precio', render: (r) => money(r.precio) },
      { key: 'estado', label: 'Estado', render: (r) => (r.estado === 'disponible' ? 'Disponible' : 'No disponible') },
    ]}
    renderFields={(form, setForm) => (
      <div className="row g-2">
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Nombre</Form.Label>
            <Form.Control className={darkControl} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Ingrese el nombre de la promo..." required />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Subtítulo</Form.Label>
            <Form.Control className={darkControl} value={form.subtitulo} onChange={(e) => setForm({ ...form, subtitulo: e.target.value })} placeholder="Ingrese un subtítulo..." />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Etiqueta</Form.Label>
            <Form.Control className={darkControl} value={form.etiqueta} onChange={(e) => setForm({ ...form, etiqueta: e.target.value })} placeholder="30% DE DESCUENTO" />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Imagen (URL)</Form.Label>
            <Form.Control className={darkControl} value={form.imagen} onChange={(e) => setForm({ ...form, imagen: e.target.value })} placeholder="https://..." />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Precio</Form.Label>
            <Form.Control className={darkControl} type="number" step="0.01" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} placeholder="Ej: 39.90" required />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Estado</Form.Label>
            <Form.Select className={darkControl} value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
              <option value="disponible">Disponible</option>
              <option value="no_disponible">No disponible</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-12">
          <Form.Group className="mb-0">
            <Form.Label className={darkLabel}>Descripción</Form.Label>
            <Form.Control className={darkControl} as="textarea" rows={2} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} placeholder="Escriba la descripción de la promo..." />
          </Form.Group>
        </div>
      </div>
    )}
  />
);

export default Promos;
