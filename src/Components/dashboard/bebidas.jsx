import React from 'react';
import { Row, Col, Button, Form, Table, Pagination } from 'react-bootstrap';

const bebidasData = [
  { id: 1, nombre: 'Vino Tinto Reserva', precio: '$18.00' },
  { id: 2, nombre: 'Cerveza Artesanal', precio: '$8.00' },
  { id: 3, nombre: 'Agua Mineral', precio: '$3.00' },
  { id: 4, nombre: 'Gaseosa Cola', precio: '$4.00' },
  { id: 5, nombre: 'Jugo Natural', precio: '$6.00' },
  { id: 6, nombre: 'Limonada', precio: '$5.00' },
  { id: 7, nombre: 'Cóctel Mojito', precio: '$12.00' },
  { id: 8, nombre: 'Café Espresso', precio: '$4.50' },
];

const BebidasAdmin = () => {
  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <h2 className="page-title">Bebidas</h2>
        <Button className="btn-admin">+ Nueva bebida</Button>
      </div>

      <Form className="search-bar mb-4">
        <Form.Control type="search" placeholder="Buscar bebida..." />
      </Form>

      <div className="table-responsive rounded">
        <Table className="admin-table table-hover mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre bebida</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bebidasData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.precio}</td>
                <td>
                  <Button variant="link" className="text-white p-0 text-decoration-none">
                    Editar
                  </Button>
                </td>
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

export default BebidasAdmin;
