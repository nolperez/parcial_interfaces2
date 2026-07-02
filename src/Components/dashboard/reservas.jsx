import React from 'react';
import { Row, Col, Button, Form, Table, Pagination } from 'react-bootstrap';

const reservasData = [
  { id: 1, nombre: 'Juan Pérez', plato: 'Bife Ancho', estado: 'Confirmado' },
  { id: 2, nombre: 'María García', plato: 'Lomo Fino', estado: 'Confirmado' },
  { id: 3, nombre: 'Carlos López', plato: 'Costillas BBQ', estado: 'Rechazado' },
  { id: 4, nombre: 'Ana Martínez', plato: 'Pollo a la Brasa', estado: 'Confirmado' },
  { id: 5, nombre: 'Pedro Sánchez', plato: 'Pasta Carbonara', estado: 'Pendiente' },
  { id: 6, nombre: 'Laura Díaz', plato: 'Hamburguesa Gourmet', estado: 'Confirmado' },
  { id: 7, nombre: 'Roberto Vega', plato: 'Ensalada César', estado: 'Rechazado' },
  { id: 8, nombre: 'Sofía Ruiz', plato: 'Sopa del Día', estado: 'Confirmado' },
];

const Reservas = () => {
  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <h2 className="page-title">Reservas</h2>
        <Button className="btn-admin">+ Nueva reserva</Button>
      </div>

      <Form className="search-bar mb-4">
        <Form.Control type="search" placeholder="Buscar reserva..." />
      </Form>

      <div className="table-responsive rounded">
        <Table className="admin-table table-hover mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Plato</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {reservasData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.plato}</td>
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

export default Reservas;
