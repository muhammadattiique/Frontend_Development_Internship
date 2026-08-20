import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../../services/task12/productService";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductById(id)
      .then((res) => {
        setProduct(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-20 text-slate-500">Loading details...</div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium"
      >
        &larr; Back to Products
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-sm">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-80 object-cover rounded-xl bg-slate-100"
        />
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-semibold">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold text-slate-800 mt-2">
              {product.title}
            </h1>
            <p className="text-slate-600 text-sm mt-2">{product.description}</p>
          </div>
          <div className="space-y-2 border-t border-slate-100 pt-4">
            <div className="text-3xl font-extrabold text-blue-600">
              ${product.price}
            </div>
            <div className="text-sm text-slate-500">
              Stock Available:{" "}
              <strong className="text-slate-700">{product.stock}</strong>
            </div>
            <div className="text-sm text-slate-500">
              Rating:{" "}
              <strong className="text-slate-700">
                ⭐ {product.rating} / 5
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
