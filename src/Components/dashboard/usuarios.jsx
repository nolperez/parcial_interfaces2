import React from 'react';
import { Row, Col, Button, Form, Table, Pagination } from 'react-bootstrap';

const usuariosData = [
  { id: 1, nombre: 'Admin Principal', rol: 'ADMIN', estado: 'Activo' },
  { id: 2, nombre: 'Carlos Mesero', rol: 'MESERO', estado: 'Activo' },
  { id: 3, nombre: 'María Cocina', rol: 'COCINA', estado: 'Activo' },
  { id: 4, nombre: 'Pedro Caja', rol: 'CAJERO', estado: 'Inactivo' },
  { id: 5, nombre: 'Ana Recepción', rol: 'RECEPCION', estado: 'Activo' },
  { id: 6, nombre: 'Usuario Test', rol: 'DESCONOCIDO', estado: 'Inactivo' },
  { id: 7, nombre: 'Luis Gerente', rol: 'ADMIN', estado: 'Activo' },
  { id: 8, nombre: 'Sofía Host', rol: 'HOST', estado: 'Activo' },
];

const Usuarios = () => {
  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <h2 className="page-title">Usuarios</h2>
        <Button className="btn-admin">+ Nuevo usuario</Button>
      </div>

      <Form className="search-bar mb-4">
        <Form.Control type="search" placeholder="Buscar usuario..." />
      </Form>

      <div className="table-responsive rounded">
        <Table className="admin-table table-hover mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuariosData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.rol}</td>
                <td>{item.estado}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Row className="mt-3">
        <Col className="d-flex justify-content-center">
          <Pagination className="pagination-admin mb-0">
            <Pagination.Prev>Anterior</Pagination.Prev>
            {[1, 2, 3, 4, 5].map((page) => (
              <Pagination.Item key={page} active={page === 1}>
                {page}
              </Pagination.Item>
            ))}
            <Pagination.Next>Siguiente</Pagination.Next>
          </Pagination>
        </Col>
      </Row>
    </div>
  );
};

export default Usuarios;
