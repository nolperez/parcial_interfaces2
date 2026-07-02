import React, { useState } from 'react';
import { Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';

const stats = [
  { icon: '📈', value: '+1254', label: 'Ventas' },
  { icon: '📉', value: '-536', label: 'Egresos' },
  { icon: '👥', value: '+89', label: 'Clientes' },
  { icon: '🍽️', value: '+342', label: 'Pedidos' },
];

const platosData = [
  { label: 'Bife', value: 85 },
  { label: 'Lomo', value: 70 },
  { label: 'Costilla', value: 55 },
  { label: 'Pollo', value: 40 },
  { label: 'Pasta', value: 30 },
];

const bebidasData = [
  { label: 'Vino', value: 75 },
  { label: 'Cerveza', value: 90 },
  { label: 'Agua', value: 45 },
  { label: 'Gaseosa', value: 60 },
  { label: 'Jugo', value: 35 },
];

const mesasData = [
  { label: 'Mesa 1', value: 90 },
  { label: 'Mesa 2', value: 75 },
  { label: 'Mesa 3', value: 60 },
  { label: 'Mesa 4', value: 45 },
  { label: 'Mesa 5', value: 30 },
];

const socialLegend = [
  { label: 'Facebook', color: '#333' },
  { label: 'WhatsApp', color: '#666' },
  { label: 'TikTok', color: '#999' },
  { label: 'Instagram', color: '#bbb' },
];

const DashboardPage = () => {
  const [filtro, setFiltro] = useState('Diario');

  return (
    <div>
      <Row className="g-3 mb-4">
        {stats.map((stat) => (
          <Col key={stat.label} xs={6} lg={3}>
            <Card className="stat-card h-100">
              <Card.Body className="d-flex align-items-center gap-3 py-3">
                <div className="stat-icon">{stat.icon}</div>
                <div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mb-4">
        <ButtonGroup className="filter-btn-group">
          {['Diario', 'Semanal', 'Mensual', 'Anual'].map((periodo) => (
            <Button
              key={periodo}
              variant="secondary"
              active={filtro === periodo}
              onClick={() => setFiltro(periodo)}
            >
              {periodo}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <Row className="g-3 mb-4">
        <Col md={6}>
          <Card className="chart-card h-100">
            <Card.Header>Top 5 platos</Card.Header>
            <Card.Body>
              <div className="bar-chart">
                {platosData.map((item) => (
                  <div key={item.label} className="bar-item">
                    <div className="bar" style={{ height: `${item.value}%` }} />
                    <span className="bar-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="chart-card h-100">
            <Card.Header>Top 5 bebidas</Card.Header>
            <Card.Body>
              <div className="bar-chart">
                {bebidasData.map((item) => (
                  <div key={item.label} className="bar-item">
                    <div className="bar" style={{ height: `${item.value}%` }} />
                    <span className="bar-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3">
        <Col md={6}>
          <Card className="chart-card h-100">
            <Card.Header>Top mesas mas vendidas</Card.Header>
            <Card.Body className="h-bar-chart pt-4">
              {mesasData.map((item) => (
                <div key={item.label} className="h-bar-row">
                  <span className="h-bar-label">{item.label}</span>
                  <div className="h-bar-track">
                    <div className="h-bar-fill" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="chart-card h-100">
            <Card.Header>Top social media</Card.Header>
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <div className="donut-chart mb-3" />
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {socialLegend.map((item) => (
                  <div key={item.label} className="d-flex align-items-center gap-1">
                    <span
                      className="d-inline-block rounded-circle"
                      style={{ width: 12, height: 12, backgroundColor: item.color }}
                    />
                    <small>{item.label}</small>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
