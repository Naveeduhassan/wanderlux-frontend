import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { getCache, setCache } from '../services/apiCache';

/**
 * Custom React hook for performant, stale-while-revalidate data fetching with client caching.
 * @param {string} endpoint - API route path
 * @param {any} initialData - Fallback data state
 */
export function useDataFetch(endpoint, initialData = null) {
  const cacheKey = `data_${endpoint.replace(/[^a-zA-Z0-9]/g, '_')}`;
  const cached = getCache(cacheKey);

  const [data, setData] = useState(cached || initialData);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(endpoint);
      setData(response.data);
      setCache(cacheKey, response.data);
    } catch (err) {
      console.warn(`useDataFetch error for ${endpoint}:`, err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, cacheKey]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
export default useDataFetch;
