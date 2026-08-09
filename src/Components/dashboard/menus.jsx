import React from 'react';
import { Form } from 'react-bootstrap';
import api from '../../api/client';
import CrudPage, { money } from './CrudPage';
import { darkControl, darkLabel } from './formDark';
import { composicionToText, parseComposicion } from '../../utils/composicion';

const emptyForm = {
  nombre: '',
  descripcion: '',
  composicion: '',
  precio: '',
  precio_promo: '',
  categoria: 'carnes',
  disponible: true,
  stock: 20,
  imagen: '',
  tiempo_preparacion: 25,
};

const toPayload = (form) => ({
  ...form,
  composicion: parseComposicion(form.composicion),
});

const Menus = () => (
  <CrudPage
    title="Menús"
    newLabel="+ Nuevo menú"
    searchPlaceholder="Buscar menú..."
    uniqueFields={[{ key: 'nombre', label: 'nombre de plato' }]}
    emptyForm={emptyForm}
    fetchList={async (q) => (await api.get('/admin/menus', { params: { q } })).data}
    onCreate={async (form) => api.post('/admin/menus', toPayload(form))}
    onUpdate={async (row, form) => api.put(`/admin/menus/${row.id}`, toPayload(form))}
    onDelete={async (row) => api.delete(`/admin/menus/${row.id}`)}
    mapRow={(row) => ({
      nombre: row.nombre,
      descripcion: row.descripcion || '',
      composicion: composicionToText(row.composicion),
      precio: row.precio,
      precio_promo: row.precio_promo || '',
      categoria: row.categoria,
      disponible: !!row.disponible,
      stock: row.stock ?? 0,
      imagen: row.imagen || '',
      tiempo_preparacion: row.tiempo_preparacion || 25,
    })}
    columns={[
      { key: 'id', label: '#' },
      { key: 'nombre', label: 'Nombre Plato' },
      { key: 'composicion', label: 'Integra', render: (r) => composicionToText(r.composicion) || '—' },
      { key: 'precio', label: 'Precio', render: (r) => money(r.precio) },
      { key: 'stock', label: 'Stock' },
      { key: 'categoria', label: 'Categoría' },
      { key: 'estado', label: 'Estado', render: (r) => (r.agotado || r.stock <= 0 ? 'Agotado' : 'Disponible') },
    ]}
    renderFields={(form, setForm) => (
      <div className="row g-2">
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Nombre</Form.Label>
            <Form.Control className={darkControl} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Ingrese el nombre del plato..." required />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Categoría</Form.Label>
            <Form.Select className={darkControl} value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
              <option value="carnes">Carnes</option>
              <option value="entradas">Entradas</option>
              <option value="guarniciones">Guarniciones</option>
              <option value="postres">Postres</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Precio</Form.Label>
            <Form.Control className={darkControl} type="number" step="0.01" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} placeholder="Ej: 45.00" required />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Precio promo</Form.Label>
            <Form.Control className={darkControl} type="number" step="0.01" value={form.precio_promo} onChange={(e) => setForm({ ...form, precio_promo: e.target.value })} placeholder="Ej: 35.00" />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Stock</Form.Label>
            <Form.Control className={darkControl} type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="Ej: 20" />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Tiempo preparación (min)</Form.Label>
            <Form.Control className={darkControl} type="number" min="1" value={form.tiempo_preparacion} onChange={(e) => setForm({ ...form, tiempo_preparacion: e.target.value })} placeholder="Ej: 25" />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>Imagen (URL)</Form.Label>
            <Form.Control className={darkControl} value={form.imagen} onChange={(e) => setForm({ ...form, imagen: e.target.value })} placeholder="https://..." />
          </Form.Group>
        </div>
        <div className="col-md-6 d-flex align-items-end">
          <Form.Check
            type="switch"
            className="text-white mb-3"
            label="Disponible"
            checked={!!form.disponible}
            onChange={(e) => setForm({ ...form, disponible: e.target.checked })}
          />
        </div>
        <div className="col-12">
          <Form.Group className="mb-3">
            <Form.Label className={darkLabel}>¿Qué integra el plato? (separar con comas)</Form.Label>
            <Form.Control
              className={darkControl}
              as="textarea"
              rows={2}
              placeholder="Ej: Arroz, Huevo frito, Ensalada"
              value={form.composicion}
              onChange={(e) => setForm({ ...form, composicion: e.target.value })}
            />
          </Form.Group>
        </div>
        <div className="col-12">
          <Form.Group className="mb-0">
            <Form.Label className={darkLabel}>Descripción</Form.Label>
            <Form.Control className={darkControl} as="textarea" rows={2} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} placeholder="Escriba la descripción del plato..." />
          </Form.Group>
        </div>
      </div>
    )}
  />
);

export default Menus;
