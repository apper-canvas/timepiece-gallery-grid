import { useState, useEffect } from "react";
import watchService from "@/services/api/watchService";

export const useWatches = (initialFilters = {}) => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const loadWatches = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await watchService.getAll(filters);
      setWatches(data);
    } catch (err) {
      setError(err.message);
      console.error("Error loading watches:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWatches();
  }, [filters]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const retry = () => {
    loadWatches();
  };

  return {
    watches,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    retry
  };
};

export const useWatch = (id) => {
  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadWatch = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await watchService.getById(id);
      setWatch(data);
    } catch (err) {
      setError(err.message);
      console.error("Error loading watch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWatch();
  }, [id]);

  const retry = () => {
    loadWatch();
  };

  return {
    watch,
    loading,
    error,
    retry
  };
};

export const useFeaturedWatches = (limit = 4) => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadFeaturedWatches = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await watchService.getFeatured(limit);
      setWatches(data);
    } catch (err) {
      setError(err.message);
      console.error("Error loading featured watches:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeaturedWatches();
  }, [limit]);

  const retry = () => {
    loadFeaturedWatches();
  };

  return {
    watches,
    loading,
    error,
    retry
  };
};

export const useRelatedWatches = (watchId, limit = 4) => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRelatedWatches = async () => {
    if (!watchId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await watchService.getRelated(watchId, limit);
      setWatches(data);
    } catch (err) {
      setError(err.message);
      console.error("Error loading related watches:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRelatedWatches();
  }, [watchId, limit]);

  const retry = () => {
    loadRelatedWatches();
  };

  return {
    watches,
    loading,
    error,
    retry
  };
};