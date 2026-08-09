import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Polling ligero para simular actualización en tiempo real (rúbrica Sobresaliente).
 */
export default function usePolling(fetcher, { intervalMs = 12000, enabled = true, immediate = true } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(Boolean(immediate && enabled));
  const fetcherRef = useRef(fetcher);

  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  const refresh = useCallback(async () => {
    try {
      const result = await fetcherRef.current();
      setData(result);
      setError('');
      return result;
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Error al actualizar');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    let cancelled = false;
    let timer;

    const tick = async () => {
      try {
        if (!cancelled) await refresh();
      } catch {
        // el error ya se guarda en state
      }
      if (!cancelled) {
        timer = window.setTimeout(tick, intervalMs);
      }
    };

    if (immediate) tick();
    else timer = window.setTimeout(tick, intervalMs);

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [enabled, intervalMs, immediate, refresh]);

  return { data, error, loading, refresh };
}
