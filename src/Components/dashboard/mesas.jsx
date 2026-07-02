import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

const mesasData = [
  { id: 1, estado: 'Libre' },
  { id: 2, estado: 'Ocupado' },
  { id: 3, estado: 'Libre' },
  { id: 4, estado: 'Ocupado' },
  { id: 5, estado: 'Libre' },
  { id: 6, estado: 'Ocupado' },
];

const Mesas = () => {
  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <h2 className="page-title">RESERVA DE MESAS</h2>
        <Button className="btn-admin">+ Nueva mesa</Button>
      </div>

      <Form className="search-bar mb-4">
        <Form.Control type="search" placeholder="Buscar mesa..." />
      </Form>

      <Row className="g-4">
        {mesasData.map((mesa) => (
          <Col key={mesa.id} xs={6} md={4} lg={3}>
            <div className={`mesa-card ${mesa.estado === 'Libre' ? 'libre' : 'ocupado'}`}>
              <span>Mesa {mesa.id}</span>
              <small className="mt-2 opacity-75">{mesa.estado}</small>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Mesas;
