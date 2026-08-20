import React, { useEffect, useState } from "react";

/**
 * Task: Fetch route-based data with useEffect and AbortController cleanup to avoid stale updates.
 */
export default function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Initialize AbortController to cancel pending requests on unmount/route change
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 2. Pass the signal to fetch request
        const response = await fetch("https://dummyjson.com/users/1", {
          signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        // 3. Ignore AbortError when the request is canceled intentionally
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        // Only update loading if the request wasn't aborted
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // 4. Cleanup function triggers controller.abort() when component unmounts
    return () => {
      controller.abort();
    };
  }, []);

  if (loading)
    return <div className="p-6 text-slate-500">Loading route data...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md border border-slate-200 mt-10">
      <h2 className="text-xl font-bold mb-4 text-slate-800">
        Route-Based Data Fetching
      </h2>
      {data && (
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-sm font-medium text-slate-700">
          <p>
            <strong>Name:</strong> {data.firstName} {data.lastName}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Phone:</strong> {data.phone}
          </p>
        </div>
      )}
    </div>
  );
}
