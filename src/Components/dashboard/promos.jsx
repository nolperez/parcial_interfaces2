import React from 'react';
import { Row, Col, Button, Form, Table, Pagination } from 'react-bootstrap';

const promosData = [
  { id: 1, nombre: 'Combo Parrillero', precio: '$55.00', estado: 'Disponible' },
  { id: 2, nombre: '2x1 en Bebidas', precio: '$16.00', estado: 'Disponible' },
  { id: 3, nombre: 'Menú Ejecutivo', precio: '$25.00', estado: 'Disponible' },
  { id: 4, nombre: 'Happy Hour', precio: '$10.00', estado: 'No disponible' },
  { id: 5, nombre: 'Descuento Familiar', precio: '$80.00', estado: 'Disponible' },
  { id: 6, nombre: 'Promo Fin de Semana', precio: '$45.00', estado: 'Disponible' },
  { id: 7, nombre: 'Cumpleaños Especial', precio: '$60.00', estado: 'Disponible' },
  { id: 8, nombre: 'Lunch Express', precio: '$18.00', estado: 'No disponible' },
];

const Promos = () => {
  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <h2 className="page-title">Promos</h2>
        <Button className="btn-admin">+ Nueva promo</Button>
      </div>

      <Form className="search-bar mb-4">
        <Form.Control type="search" placeholder="Buscar promo..." />
      </Form>

      <div className="table-responsive rounded">
        <Table className="admin-table table-hover mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {promosData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.precio}</td>
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

export default Promos;
