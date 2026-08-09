import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { useUI } from '../../context/UIContext';
import { getApiErrorMessage, swalConfirm, validateRequiredForm, validateUniqueFields } from '../../utils/swal';
import AdminPagination, { useAdminPagination } from './AdminPagination';

const money = (value) => {
  const n = Number(value ?? 0);
  return `S/ ${n.toFixed(2)}`;
};

export { money };

function CrudPage({
  title,
  newLabel = '+ Nuevo',
  columns,
  fetchList,
  onCreate,
  onUpdate,
  onDelete,
  emptyForm,
  renderFields,
  mapRow,
  searchPlaceholder = 'Buscar...',
  uniqueFields = [],
}) {
  const { success, error: notifyError } = useUI();
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const fetchListRef = useRef(fetchList);
  const onCreateRef = useRef(onCreate);
  const onUpdateRef = useRef(onUpdate);
  const onDeleteRef = useRef(onDelete);
  const notifyErrorRef = useRef(notifyError);
  const successRef = useRef(success);

  useEffect(() => { fetchListRef.current = fetchList; }, [fetchList]);
  useEffect(() => { onCreateRef.current = onCreate; }, [onCreate]);
  useEffect(() => { onUpdateRef.current = onUpdate; }, [onUpdate]);
  useEffect(() => { onDeleteRef.current = onDelete; }, [onDelete]);
  useEffect(() => { notifyErrorRef.current = notifyError; }, [notifyError]);
  useEffect(() => { successRef.current = success; }, [success]);

  const load = useCallback(async (term = '') => {
    setLoading(true);
    try {
      const data = await fetchListRef.current(term);
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      notifyErrorRef.current(getApiErrorMessage(err, 'No se pudo cargar la información'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load('');
  }, [load]);

  const filtered = useMemo(() => {
    if (!q) return items;
    const term = q.toLowerCase();
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(term));
  }, [items, q]);

  const pagination = useAdminPagination(filtered, 8, q);

  const openCreate = useCallback(() => {
    setEditing(null);
    setForm(emptyForm);
    setShow(true);
  }, [emptyForm]);

  const openEdit = useCallback((row) => {
    setEditing(row);
    setForm(mapRow ? mapRow(row) : { ...row });
    setShow(true);
  }, [mapRow]);

  const save = useCallback(async (e) => {
    e.preventDefault();
    if (!validateRequiredForm(e.currentTarget)) return;
    if (!validateUniqueFields(form, items, uniqueFields, editing)) return;
    setSaving(true);
    try {
      if (editing) await onUpdateRef.current(editing, form);
      else await onCreateRef.current(form);
      setShow(false);
      successRef.current(editing ? 'Registro actualizado' : 'Registro creado');
      await load(q);
    } catch (err) {
      notifyErrorRef.current(getApiErrorMessage(err, 'No se pudo guardar'));
    } finally {
      setSaving(false);
    }
  }, [editing, form, items, load, q, uniqueFields]);

  const remove = useCallback(async (row) => {
    const ok = await swalConfirm('Esta acción no se puede deshacer.', '¿Eliminar este registro?');
    if (!ok) return;
    try {
      await onDeleteRef.current(row);
      successRef.current('Registro eliminado');
      await load(q);
    } catch (err) {
      notifyErrorRef.current(getApiErrorMessage(err, 'No se pudo eliminar'));
    }
  }, [load, q]);

  return (
    <div className="text-white">
      <div className="admin-band d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
        <h3 className="fw-bold mb-0 text-uppercase h4">{title}</h3>
        {onCreate && (
          <Button className="btn-light rounded-3 text-uppercase fw-bold align-self-start" onClick={openCreate}>
            {newLabel}
          </Button>
        )}
      </div>

      <div className="admin-panel p-2 px-3 mb-3">
        <Form onSubmit={(e) => { e.preventDefault(); load(q); }}>
          <Form.Control
            type="search"
            placeholder={searchPlaceholder}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label={searchPlaceholder}
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
          <div className="admin-table-wrap table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  {columns.map((c) => <th key={c.key} className="text-uppercase px-3 py-3">{c.label}</th>)}
                  {(onUpdate || onDelete) && <th className="text-uppercase px-3 py-3">Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {pagination.pageItems.map((row) => (
                  <tr key={row.id || row.idmesa}>
                    {columns.map((c) => (
                      <td key={c.key} className="px-3 py-3">{c.render ? c.render(row) : row[c.key]}</td>
                    ))}
                    {(onUpdate || onDelete) && (
                      <td className="px-3 py-3">
                        <div className="d-flex flex-wrap gap-2">
                          {onUpdate && (
                            <Button size="sm" className="btn-outline-light rounded-3" onClick={() => openEdit(row)}>
                              Editar
                            </Button>
                          )}
                          {onDelete && (
                            <Button size="sm" className="admin-btn-cancel rounded-3" onClick={() => remove(row)}>
                              Eliminar
                            </Button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
                {pagination.total === 0 && (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center py-5 text-secondary">
                      Sin registros
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
        <Form onSubmit={save} noValidate autoComplete="off">
          <Modal.Header closeButton closeVariant="white">
            <Modal.Title className="text-uppercase fw-bold mb-0">
              {editing ? 'Editar' : 'Nuevo'} {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {renderFields(form, setForm)}
          </Modal.Body>
          <Modal.Footer>
            <div className="row g-2 w-100 m-0">
              <div className="col-6">
                <Button type="button" size="sm" className="admin-btn-cancel w-100" onClick={() => setShow(false)}>
                  Cancelar
                </Button>
              </div>
              <div className="col-6">
                <Button type="submit" size="sm" className="btn-light w-100 fw-bold" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar'}
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default memo(CrudPage);
