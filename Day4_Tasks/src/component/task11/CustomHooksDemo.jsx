import React, { useState } from "react";
import { useFetch } from "../../hooks/task11/useFetch";
import { useDebounce } from "../../hooks/task11/useDebounce";
import { useLocalStorage } from "../../hooks/task11/useLocalStorage";
import { useDocumentTitle } from "../../hooks/task11/useDocumentTitle";

export default function CustomHooksDemo() {
  useDocumentTitle("Task 11: Custom Hooks Demo");

  const [name, setName] = useLocalStorage("username", "Attique");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);

  const { data, loading, error } = useFetch("https://dummyjson.com/users/1");

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md border border-slate-200 mt-10 space-y-6">
      <h2 className="text-xl font-bold text-slate-800">
        Task 11: Custom Hooks Implementation
      </h2>

      <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
        <h3 className="font-semibold text-sm text-slate-700 mb-2">
          1. useLocalStorage
        </h3>
        <p className="text-sm text-slate-600 mb-2">
          Saved Name: <strong>{name}</strong>
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-slate-300 rounded text-sm w-full"
          placeholder="Type to save in localStorage"
        />
      </div>

      <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
        <h3 className="font-semibold text-sm text-slate-700 mb-2">
          2. useDebounce
        </h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-slate-300 rounded text-sm w-full mb-2"
          placeholder="Type to test debounce..."
        />
        <p className="text-sm text-slate-600">
          Debounced Output: <strong>{debouncedSearch}</strong>
        </p>
      </div>

      <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
        <h3 className="font-semibold text-sm text-slate-700 mb-2">
          3. useFetch & useDocumentTitle
        </h3>
        {loading && (
          <p className="text-sm text-slate-500">Loading fetch data...</p>
        )}
        {error && <p className="text-sm text-red-500">Error: {error}</p>}
        {data && (
          <div className="text-sm text-slate-700">
            <p>
              <strong>Fetched User:</strong> {data.firstName} {data.lastName}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
