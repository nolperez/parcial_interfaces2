import React, { memo, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Spinner } from 'react-bootstrap';
import api from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import usePolling from '../../hooks/usePolling';
import AdminPagination, { useAdminPagination } from './AdminPagination';

const ESTADO_BADGE = {
  pendiente: { className: 'dash-badge dash-badge--warn', icon: 'fa-clock' },
  confirmada: { className: 'dash-badge dash-badge--ok', icon: 'fa-circle-check' },
  rechazada: { className: 'dash-badge dash-badge--danger', icon: 'fa-circle-xmark' },
  cancelada: { className: 'dash-badge dash-badge--muted', icon: 'fa-ban' },
};

const PERIODS = [
  { key: 'Diario', icon: 'fa-sun' },
  { key: 'Semanal', icon: 'fa-calendar-week' },
  { key: 'Mensual', icon: 'fa-calendar' },
  { key: 'Anual', icon: 'fa-calendar-days' },
];

const QUICK_LINKS = [
  { to: '/dashboard/reservas', icon: 'fa-calendar-plus', label: 'Reservas' },
  { to: '/dashboard/menus', icon: 'fa-utensils', label: 'Menús' },
  { to: '/dashboard/mesas', icon: 'fa-chair', label: 'Mesas' },
  { to: '/dashboard/usuarios', icon: 'fa-user-plus', label: 'Usuarios' },
];

const ESTADO_ICONS = {
  pendiente: 'fa-clock',
  confirmada: 'fa-circle-check',
  cancelada: 'fa-ban',
  rechazada: 'fa-circle-xmark',
};

function BarChart({ data, color = '#d4580e', height = 180 }) {
  const max = Math.max(1, ...data.map((d) => Number(d.raw ?? d.value) || 0));

  return (
    <div className="dash-chart" style={{ minHeight: height }}>
      <div className="dash-chart-grid" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="dash-chart-grid-line" />
        ))}
      </div>
      <div className="dash-chart-bars">
        {data.map((item) => {
          const raw = Number(item.raw ?? item.value) || 0;
          const pct = Math.max(raw > 0 ? (raw / max) * 100 : 0, raw > 0 ? 6 : 2);
          return (
            <div key={item.label} className="dash-chart-col" title={`${item.label}: ${raw}`}>
              <span className="dash-chart-value">{raw}</span>
              <div className="dash-chart-track">
                <div
                  className="dash-chart-bar"
                  style={{ height: `${pct}%`, background: `linear-gradient(180deg, ${color} 0%, #8a3208 100%)` }}
                />
              </div>
              <span className="dash-chart-label">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RankList({ items, empty = 'Sin datos' }) {
  const max = Math.max(1, ...items.map((i) => Number(i.value) || 0));
  if (!items.length) {
    return <p className="text-secondary small mb-0 py-3 text-center">{empty}</p>;
  }
  return (
    <ul className="dash-rank list-unstyled mb-0">
      {items.map((item, idx) => {
        const value = Number(item.value) || 0;
        const pct = Math.round((value / max) * 100);
        return (
          <li key={`${item.label}-${idx}`} className="dash-rank-item">
            <div className="d-flex justify-content-between align-items-baseline gap-2 mb-1">
              <span className="dash-rank-name text-truncate">
                <span className="dash-rank-n">{idx + 1}</span>
                {item.label}
              </span>
              <span className="dash-rank-meta flex-shrink-0">{item.meta}</span>
            </div>
            <div className="dash-rank-track">
              <div className="dash-rank-fill" style={{ width: `${pct}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function OccupancyRing({ libre = 0, ocupado = 0 }) {
  const total = Math.max(libre + ocupado, 1);
  const freePct = Math.round((libre / total) * 100);
  const style = {
    background: `conic-gradient(#d4580e 0% ${100 - freePct}%, #2f7d4a 0% 100%)`,
  };

  return (
    <div className="dash-ring-wrap">
      <div className="dash-ring" style={style}>
        <div className="dash-ring-inner">
          <strong>{freePct}%</strong>
          <span>libres</span>
        </div>
      </div>
      <div className="dash-ring-legend">
        <div>
          <i className="fa-solid fa-door-open" style={{ color: '#2f7d4a' }} aria-hidden="true" />
          <span>Libres</span>
          <strong>{libre}</strong>
        </div>
        <div>
          <i className="fa-solid fa-users" style={{ color: '#d4580e' }} aria-hidden="true" />
          <span>Ocupadas</span>
          <strong>{ocupado}</strong>
        </div>
      </div>
    </div>
  );
}

const DashboardPage = () => {
  const { user } = useAuth();
  const [filtro, setFiltro] = React.useState('Diario');

  const fetcher = useCallback(async () => {
    const { data } = await api.get('/dashboard/stats', { params: { periodo: filtro } });
    return data;
  }, [filtro]);

  const { data: stats, loading, refresh } = usePolling(fetcher, {
    intervalMs: 15000,
    enabled: true,
  });

  React.useEffect(() => {
    refresh().catch(() => {});
  }, [filtro, refresh]);

  const cards = useMemo(() => {
    if (!stats) return [];
    return [
      { icon: 'fa-solid fa-calendar-check', value: stats.totales.reservas, label: `Reservas / ${filtro}`, tone: 'accent' },
      { icon: 'fa-solid fa-utensils', value: stats.totales.menus, label: 'Platos en carta', tone: 'ember' },
      { icon: 'fa-solid fa-users', value: stats.totales.clientes, label: 'Clientes', tone: 'accent' },
      { icon: 'fa-solid fa-chair', value: `${stats.mesas.libre}/${stats.totales.mesas}`, label: 'Mesas libres', tone: 'ok' },
      { icon: 'fa-solid fa-box-open', value: stats.totales.agotados || 0, label: 'Agotados', tone: 'danger' },
    ];
  }, [stats, filtro]);

  const serieData = useMemo(() => {
    const serie = stats?.reservas_serie || [];
    return serie.map((s) => ({
      label: s.label,
      raw: Number(s.value) || 0,
      value: Number(s.value) || 0,
    }));
  }, [stats]);

  const platosData = useMemo(
    () => (stats?.top_menus || []).map((m) => ({
      label: m.nombre,
      value: Number(m.stock) || 0,
      meta: `Stock ${m.stock}`,
    })),
    [stats]
  );

  const bebidasData = useMemo(
    () => (stats?.top_bebidas || []).map((b) => ({
      label: b.nombre,
      value: Number(b.stock) || 0,
      meta: `Stock ${b.stock}`,
    })),
    [stats]
  );

  const estados = useMemo(() => {
    const map = stats?.reservas_por_estado || {};
    return [
      { key: 'pendiente', label: 'Pendientes', value: Number(map.pendiente) || 0 },
      { key: 'confirmada', label: 'Confirmadas', value: Number(map.confirmada) || 0 },
      { key: 'cancelada', label: 'Canceladas', value: Number(map.cancelada) || 0 },
      { key: 'rechazada', label: 'Rechazadas', value: Number(map.rechazada) || 0 },
    ];
  }, [stats]);

  const reservasRecientes = useMemo(
    () => stats?.reservas_recientes || [],
    [stats]
  );
  const recientesPagination = useAdminPagination(reservasRecientes, 5, String(reservasRecientes.length));

  if (loading && !stats) {
    return (
      <div className="text-center py-5 text-white">
        <Spinner animation="border" style={{ color: '#d4580e' }} />
      </div>
    );
  }

  return (
    <div className="dash-page w-100 text-white">
      <header className="dash-hero mb-4">
        <div className="dash-hero-copy">
          <p className="dash-hero-kicker mb-1">
            <i className="fa-solid fa-signal dash-live-icon" aria-hidden="true" />
            En vivo
            <i className="fa-solid fa-clock ms-2 me-1" aria-hidden="true" />
            cada 15s
          </p>
          <h1 className="dash-hero-title mb-1">
            <i className="fa-solid fa-fire-flame-curved me-2 admin-accent" aria-hidden="true" />
            Hola, {user?.name || 'Admin'}
          </h1>
          <p className="dash-hero-sub mb-0">
            <i className="fa-solid fa-chart-pie me-2" aria-hidden="true" />
            Resumen operativo de Gourmet Fire Pit
          </p>
        </div>
        <div className="dash-hero-actions">
          <div className="dash-period" role="group" aria-label="Periodo">
            {PERIODS.map((periodo) => (
              <button
                key={periodo.key}
                type="button"
                className={`dash-period-btn ${filtro === periodo.key ? 'is-active' : ''}`}
                onClick={() => setFiltro(periodo.key)}
              >
                <i className={`fa-solid ${periodo.icon}`} aria-hidden="true" />
                {periodo.key}
              </button>
            ))}
          </div>
          <button type="button" className="dash-refresh-btn" onClick={() => refresh()}>
            <i className="fa-solid fa-rotate" aria-hidden="true" />
            Actualizar
          </button>
        </div>
      </header>

      <Row className="g-3 mb-4 w-100 mx-0">
        {cards.map((stat) => (
          <Col key={stat.label} xs={6} lg className="px-2">
            <article className={`dash-stat dash-stat--${stat.tone} h-100`}>
              <div className="dash-stat-icon" aria-hidden="true">
                <i className={stat.icon} />
              </div>
              <div className="min-w-0">
                <div className="dash-stat-value">{stat.value}</div>
                <div className="dash-stat-label">{stat.label}</div>
              </div>
            </article>
          </Col>
        ))}
      </Row>

      <div className="dash-quick mb-4">
        {QUICK_LINKS.map((link) => (
          <Link key={link.to} to={link.to} className="dash-quick-link">
            <i className={`fa-solid ${link.icon}`} aria-hidden="true" />
            <span>{link.label}</span>
          </Link>
        ))}
      </div>

      <Row className="g-3 mb-4 w-100 mx-0">
        <Col lg={8} className="px-2">
          <section className="dash-panel h-100">
            <div className="dash-panel-head">
              <div>
                <h2 className="dash-panel-title">
                  <i className="fa-solid fa-chart-column me-2" aria-hidden="true" />
                  Reservas
                </h2>
                <p className="dash-panel-sub mb-0">
                  <i className="fa-solid fa-filter me-1" aria-hidden="true" />
                  Actividad {filtro.toLowerCase()}
                </p>
              </div>
              <span className="dash-panel-chip">
                <i className="fa-solid fa-hashtag me-1" aria-hidden="true" />
                {stats?.totales?.reservas || 0} total
              </span>
            </div>
            <BarChart
              data={serieData.length ? serieData : [{ label: '-', raw: 0, value: 0 }]}
              height={210}
            />
          </section>
        </Col>
        <Col lg={4} className="px-2">
          <section className="dash-panel h-100">
            <div className="dash-panel-head">
              <div>
                <h2 className="dash-panel-title">
                  <i className="fa-solid fa-chair me-2" aria-hidden="true" />
                  Mesas
                </h2>
                <p className="dash-panel-sub mb-0">
                  <i className="fa-solid fa-chart-pie me-1" aria-hidden="true" />
                  Ocupacion actual
                </p>
              </div>
            </div>
            <OccupancyRing
              libre={stats?.mesas?.libre || 0}
              ocupado={stats?.mesas?.ocupado || 0}
            />
          </section>
        </Col>
      </Row>

      <Row className="g-3 mb-4 w-100 mx-0">
        <Col md={6} xl={4} className="px-2">
          <section className="dash-panel h-100">
            <div className="dash-panel-head">
              <div>
                <h2 className="dash-panel-title">
                  <i className="fa-solid fa-utensils me-2" aria-hidden="true" />
                  Top platos
                </h2>
                <p className="dash-panel-sub mb-0">
                  <i className="fa-solid fa-boxes-stacked me-1" aria-hidden="true" />
                  Por stock disponible
                </p>
              </div>
            </div>
            <RankList items={platosData} empty="Sin platos" />
          </section>
        </Col>
        <Col md={6} xl={4} className="px-2">
          <section className="dash-panel h-100">
            <div className="dash-panel-head">
              <div>
                <h2 className="dash-panel-title">
                  <i className="fa-solid fa-wine-glass me-2" aria-hidden="true" />
                  Top bebidas
                </h2>
                <p className="dash-panel-sub mb-0">
                  <i className="fa-solid fa-boxes-stacked me-1" aria-hidden="true" />
                  Por stock disponible
                </p>
              </div>
            </div>
            <RankList items={bebidasData} empty="Sin bebidas" />
          </section>
        </Col>
        <Col md={12} xl={4} className="px-2">
          <section className="dash-panel h-100">
            <div className="dash-panel-head">
              <div>
                <h2 className="dash-panel-title">
                  <i className="fa-solid fa-list-check me-2" aria-hidden="true" />
                  Estado reservas
                </h2>
                <p className="dash-panel-sub mb-0">
                  <i className="fa-solid fa-calendar-check me-1" aria-hidden="true" />
                  Periodo seleccionado
                </p>
              </div>
            </div>
            <div className="dash-estado-grid">
              {estados.map((e) => (
                <div key={e.key} className={`dash-estado dash-estado--${e.key}`}>
                  <span>
                    <i className={`fa-solid ${ESTADO_ICONS[e.key]} me-1`} aria-hidden="true" />
                    {e.label}
                  </span>
                  <strong>{e.value}</strong>
                </div>
              ))}
            </div>
          </section>
        </Col>
      </Row>

      <section className="dash-panel">
        <div className="dash-panel-head">
          <div>
            <h2 className="dash-panel-title">
              <i className="fa-solid fa-clock-rotate-left me-2" aria-hidden="true" />
              Reservas recientes
            </h2>
            <p className="dash-panel-sub mb-0">
              <i className="fa-solid fa-inbox me-1" aria-hidden="true" />
              Ultimas solicitudes del sistema
            </p>
          </div>
          <Link to="/dashboard/reservas" className="dash-panel-link">
            Ver todas
            <i className="fa-solid fa-arrow-right ms-2" aria-hidden="true" />
          </Link>
        </div>

        <div className="dash-table-wrap table-responsive">
          <table className="dash-table">
            <thead>
              <tr>
                <th>
                  <i className="fa-solid fa-user me-1" aria-hidden="true" />
                  Cliente
                </th>
                <th>
                  <i className="fa-solid fa-chair me-1" aria-hidden="true" />
                  Mesa
                </th>
                <th>
                  <i className="fa-solid fa-calendar-day me-1" aria-hidden="true" />
                  Fecha
                </th>
                <th>
                  <i className="fa-solid fa-flag me-1" aria-hidden="true" />
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {recientesPagination.pageItems.map((r) => {
                const badge = ESTADO_BADGE[r.estado] || { className: 'dash-badge', icon: 'fa-circle-info' };
                return (
                  <tr key={r.id}>
                    <td>
                      <div className="fw-semibold text-white">{r.nombres}</div>
                      <div className="small text-secondary">
                        <i className="fa-solid fa-envelope me-1" aria-hidden="true" />
                        {r.email || r.telefono || 'Sin dato'}
                      </div>
                    </td>
                    <td>
                      <i className="fa-solid fa-chair me-1 text-secondary" aria-hidden="true" />
                      {r.mesa?.nombremessa || 'Sin mesa'}
                    </td>
                    <td>
                      <i className="fa-solid fa-clock me-1 text-secondary" aria-hidden="true" />
                      {r.fecha_hora
                        ? new Date(r.fecha_hora).toLocaleString('es-PE', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                        : 'Sin fecha'}
                    </td>
                    <td>
                      <span className={badge.className}>
                        <i className={`fa-solid ${badge.icon} me-1`} aria-hidden="true" />
                        {r.estado}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {recientesPagination.total === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-secondary py-4">
                    <i className="fa-solid fa-inbox me-2" aria-hidden="true" />
                    Sin reservas recientes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <AdminPagination {...recientesPagination} pageSizeOptions={[5, 8, 10]} />
      </section>
    </div>
  );
};

export default memo(DashboardPage);
