import { useState, useEffect } from "react";
import { fetchProducts } from "../../services/task12/productService";

export function useProducts(queryString) {
  const [data, setData] = useState({ products: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchProducts(queryString);
        if (!signal.aborted) {
          setData(result);
        }
      } catch (err) {
        if (err.name !== "AbortError" && !signal.aborted) {
          setError(err.message);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      controller.abort();
    };
  }, [queryString]);

  return { ...data, loading, error };
}
