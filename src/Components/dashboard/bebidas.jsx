import React from 'react';
import { Form } from 'react-bootstrap';
import api from '../../api/client';
import CrudPage, { money } from './CrudPage';
import { darkControl, darkLabel } from './formDark';

const emptyForm = {
  nombre: '',
  descripcion: '',
  precio: '',
  seccion: 'Cócteles de Autor',
  disponible: true,
  stock: 40,
  imagen: '',
};

const BebidasAdmin = () => (
  <CrudPage
    title="Bebidas"
    newLabel="+ Nueva bebida"
    searchPlaceholder="Buscar bebida..."
    uniqueFields={[{ key: 'nombre', label: 'nombre de bebida' }]}
    emptyForm={emptyForm}
    fetchList={async (q) => (await api.get('/admin/bebidas', { params: { q } })).data}
    onCreate={async (form) => api.post('/admin/bebidas', form)}
    onUpdate={async (row, form) => api.put(`/admin/bebidas/${row.id}`, form)}
    onDelete={async (row) => api.delete(`/admin/bebidas/${row.id}`)}
    mapRow={(row) => ({
      nombre: row.nombre,
      descripcion: row.descripcion || '',
      precio: row.precio,
      seccion: row.seccion,
      disponible: !!row.disponible,
      stock: row.stock ?? 0,
      imagen: row.imagen || '',
    })}
    columns={[
      { key: 'id', label: '#' },
      { key: 'nombre', label: 'Nombre' },
      { key: 'seccion', label: 'Sección' },
      { key: 'precio', label: 'Precio', render: (r) => money(r.precio) },
      { key: 'stock', label: 'Stock' },
      { key: 'estado', label: 'Estado', render: (r) => (r.agotado || r.stock <= 0 ? 'Agotado' : 'Disponible') },
    ]}
    renderFields={(form, setForm) => (
      <div className="row g-2">
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Nombre</Form.Label>
            <Form.Control className={darkControl} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Ingrese el nombre de la bebida..." required />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Sección</Form.Label>
            <Form.Control className={darkControl} value={form.seccion} onChange={(e) => setForm({ ...form, seccion: e.target.value })} placeholder="Ej: Cócteles, Refrescos..." required />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Precio</Form.Label>
            <Form.Control className={darkControl} type="number" step="0.01" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} placeholder="Ej: 18.00" required />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Stock</Form.Label>
            <Form.Control className={darkControl} type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="Ej: 30" />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Imagen (URL)</Form.Label>
            <Form.Control className={darkControl} value={form.imagen} onChange={(e) => setForm({ ...form, imagen: e.target.value })} placeholder="https://..." />
          </Form.Group>
        </div>
        <div className="col-md-6 d-flex align-items-end">
          <Form.Check type="switch" className="text-white mb-3" label="Disponible" checked={!!form.disponible} onChange={(e) => setForm({ ...form, disponible: e.target.checked })} />
        </div>
        <div className="col-12">
          <Form.Group className="mb-0">
            <Form.Label className={darkLabel}>Descripción</Form.Label>
            <Form.Control className={darkControl} as="textarea" rows={2} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} placeholder="Escriba la descripción de la bebida..." />
          </Form.Group>
        </div>
      </div>
    )}
  />
);

export default BebidasAdmin;
