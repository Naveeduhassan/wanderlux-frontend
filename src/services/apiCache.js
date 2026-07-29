import api from './api';

// In-memory & Session storage client cache for zero latency SPA navigation
const memoryCache = new Map();
const TTL_MS = 10 * 60 * 1000; // 10 minutes cache TTL

export const fetchWithCache = async (url, fallbackData = []) => {
  // 1. Check memory cache first (0ms)
  const memItem = memoryCache.get(url);
  if (memItem && Date.now() < memItem.expiry) {
    // Return cached data immediately, then background revalidate
    revalidateInBackground(url);
    return memItem.data;
  }

  // 2. Check sessionStorage
  try {
    const sessionItem = sessionStorage.getItem(`cache_${url}`);
    if (sessionItem) {
      const parsed = JSON.parse(sessionItem);
      if (parsed && Date.now() < parsed.expiry) {
        memoryCache.set(url, parsed);
        revalidateInBackground(url);
        return parsed.data;
      }
    }
  } catch (e) {}

  // 3. Perform network fetch if no cache hit
  try {
    const res = await api.get(url);
    const data = (res.data && res.data.length > 0) ? res.data : fallbackData;
    saveToCache(url, data);
    return data;
  } catch (err) {
    console.warn(`[ApiCache] Network fetch error for ${url}, using fallback:`, err.message);
    return fallbackData;
  }
};

const saveToCache = (url, data) => {
  const cacheObj = {
    data,
    expiry: Date.now() + TTL_MS
  };
  memoryCache.set(url, cacheObj);
  try {
    sessionStorage.setItem(`cache_${url}`, JSON.stringify(cacheObj));
  } catch (e) {}
};

const revalidateInBackground = async (url) => {
  try {
    const res = await api.get(url);
    if (res.data && res.data.length > 0) {
      saveToCache(url, res.data);
    }
  } catch (e) {}
};

export const clearClientCache = (urlPrefix = '') => {
  if (!urlPrefix) {
    memoryCache.clear();
    try { sessionStorage.clear(); } catch(e){}
    return;
  }
  for (const key of memoryCache.keys()) {
    if (key.includes(urlPrefix)) {
      memoryCache.delete(key);
      try { sessionStorage.removeItem(`cache_${key}`); } catch(e){}
    }
  }
};
