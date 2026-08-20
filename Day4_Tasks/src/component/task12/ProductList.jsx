import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useProducts } from "../../hooks/task12/useProducts";
import { fetchCategories } from "../../services/task12/productService";

export default function ProductList() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchCategory = queryParams.get("category") || "";
  const searchQuery = queryParams.get("search") || "";
  const currentPage = parseInt(queryParams.get("page")) || 1;
  const limit = 8;
  const skip = (currentPage - 1) * limit;

  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState(searchQuery);

  // Build API query string based on URL parameters
  let apiQuery = `?limit=${limit}&skip=${skip}`;
  if (searchCategory) {
    apiQuery = `/category/${searchCategory}?limit=${limit}&skip=${skip}`;
  } else if (searchQuery) {
    apiQuery = `/search?q=${searchQuery}&limit=${limit}&skip=${skip}`;
  }

  const { products, total, loading, error } = useProducts(apiQuery);

  useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res))
      .catch((err) => console.error(err));
  }, []);

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    const params = new URLSearchParams(location.search);
    if (cat) params.set("category", cat);
    else params.delete("category");
    params.delete("search");
    params.set("page", "1");
    navigate(`?${params.toString()}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (searchInput) params.set("search", searchInput);
    else params.delete("search");
    params.delete("category");
    params.set("page", "1");
    navigate(`?${params.toString()}`);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(location.search);
    params.set("page", newPage);
    navigate(`?${params.toString()}`);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">
        Task 12: Routed Product Catalog
      </h2>

      {/* Filters Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <form
          onSubmit={handleSearchSubmit}
          className="flex gap-2 w-full sm:w-auto"
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
            className="p-2 border border-slate-300 rounded text-sm w-full sm:w-64"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        <select
          value={searchCategory}
          onChange={handleCategoryChange}
          className="p-2 border border-slate-300 rounded text-sm w-full sm:w-48 bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug || cat} value={cat.slug || cat}>
              {cat.name || cat}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12 text-slate-500">
          Loading products...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          Error: {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500 font-medium">
            No products found matching your criteria.
          </p>
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-40 w-full object-cover bg-slate-100"
              />
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-500 capitalize">
                    {product.category}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-600">
                    ${product.price}
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                    ⭐ {product.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 bg-white border border-slate-300 rounded text-sm disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-slate-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 bg-white border border-slate-300 rounded text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
