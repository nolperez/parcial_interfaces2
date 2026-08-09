import React, { useEffect, useMemo, useState } from 'react';

export function useAdminPagination(items, initialSize = 8, resetKey = '') {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialSize);
  const list = Array.isArray(items) ? items : [];

  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);

  useEffect(() => {
    setPage(1);
  }, [resetKey, pageSize, total]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const safePage = Math.min(Math.max(page, 1), totalPages);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return list.slice(start, start + pageSize);
  }, [list, safePage, pageSize]);

  const from = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, total);

  return {
    page: safePage,
    setPage,
    pageSize,
    setPageSize,
    total,
    totalPages,
    pageItems,
    from,
    to,
  };
}

function pageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current, current - 1, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((n) => pages.add(n));
  if (current >= total - 2) [total - 1, total - 2, total - 3].forEach((n) => pages.add(n));
  return [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
}

export default function AdminPagination({
  page,
  setPage,
  pageSize,
  setPageSize,
  total,
  totalPages,
  from,
  to,
  pageSizeOptions = [5, 8, 10, 20],
}) {
  if (total === 0) return null;

  const numbers = pageNumbers(page, totalPages);

  return (
    <div className="admin-pagination">
      <div className="admin-pagination-info">
        <i className="fa-solid fa-list me-2" aria-hidden="true" />
        Mostrando {from}-{to} de {total}
      </div>

      <div className="admin-pagination-controls">
        <label className="admin-pagination-size">
          <span>Por página</span>
          <select
            className="admin-input"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            aria-label="Registros por página"
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>

        <div className="admin-pagination-btns" role="navigation" aria-label="Paginacion">
          <button
            type="button"
            className="admin-page-btn"
            disabled={page <= 1}
            onClick={() => setPage(1)}
            aria-label="Primera pagina"
          >
            <i className="fa-solid fa-angles-left" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="admin-page-btn"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-label="Pagina anterior"
          >
            <i className="fa-solid fa-angle-left" aria-hidden="true" />
          </button>

          {numbers.map((n, idx) => {
            const prev = numbers[idx - 1];
            const showGap = prev != null && n - prev > 1;
            return (
              <React.Fragment key={n}>
                {showGap && <span className="admin-page-gap">...</span>}
                <button
                  type="button"
                  className={`admin-page-btn ${page === n ? 'is-active' : ''}`}
                  onClick={() => setPage(n)}
                  aria-label={`Pagina ${n}`}
                  aria-current={page === n ? 'page' : undefined}
                >
                  {n}
                </button>
              </React.Fragment>
            );
          })}

          <button
            type="button"
            className="admin-page-btn"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            aria-label="Pagina siguiente"
          >
            <i className="fa-solid fa-angle-right" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="admin-page-btn"
            disabled={page >= totalPages}
            onClick={() => setPage(totalPages)}
            aria-label="Ultima pagina"
          >
            <i className="fa-solid fa-angles-right" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
