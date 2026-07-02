import React from 'react';
import { Row, Col, Button, Form, Table, Pagination } from 'react-bootstrap';

const menusData = [
  { id: 1, nombre: 'Bife Ancho a la Parrilla', precio: '$45.00', precioPromo: '$38.00' },
  { id: 2, nombre: 'Lomo Fino con Salsa', precio: '$52.00', precioPromo: '$44.00' },
  { id: 3, nombre: 'Costillas BBQ', precio: '$38.00', precioPromo: '$32.00' },
  { id: 4, nombre: 'Pollo a la Brasa', precio: '$28.00', precioPromo: '$24.00' },
  { id: 5, nombre: 'Pasta Carbonara', precio: '$22.00', precioPromo: '$18.00' },
  { id: 6, nombre: 'Ensalada César', precio: '$15.00', precioPromo: '$12.00' },
  { id: 7, nombre: 'Hamburguesa Gourmet', precio: '$25.00', precioPromo: '$20.00' },
  { id: 8, nombre: 'Sopa del Día', precio: '$12.00', precioPromo: '$10.00' },
];

const Menus = () => {
  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <h2 className="page-title">Menús</h2>
        <Button className="btn-admin">+ Nuevo menú</Button>
      </div>

      <Form className="search-bar mb-4">
        <Form.Control type="search" placeholder="Buscar menú..." />
      </Form>

      <div className="table-responsive rounded">
        <Table className="admin-table table-hover mb-0" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre Plato</th>
              <th>Precio</th>
              <th>Precio Promo</th>
            </tr>
          </thead>
          <tbody>
            {menusData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.precio}</td>
                <td>{item.precioPromo}</td>
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

export default Menus;
