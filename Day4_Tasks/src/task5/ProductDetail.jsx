import React from "react";
import { useParams, Link } from "react-router-dom";

const productsData = {
  1: {
    name: "Wireless Mechanical Keyboard",
    price: "$89",
    description:
      "RGB backlit mechanical keyboard with custom tactile switches.",
  },
  2: {
    name: "Ergonomic Office Chair",
    price: "$249",
    description:
      "Fully adjustable mesh office chair designed for all-day lumbar support.",
  },
  3: {
    name: "Ultra-Wide Gaming Monitor",
    price: "$499",
    description:
      "34-inch curved display with 144Hz refresh rate and crisp color accuracy.",
  },
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = productsData[id];

  if (!product) {
    return (
      <div className="text-center py-12 text-slate-500 font-semibold">
        Product not found.
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <Link
        to="/products"
        className="text-rose-600 text-sm font-semibold hover:underline mb-4 inline-block"
      >
        &larr; Back to Products
      </Link>
      <h1 className="text-3xl font-bold mb-2 text-slate-900">{product.name}</h1>
      <span className="inline-block bg-rose-50 text-rose-600 font-bold px-3 py-1 rounded-full text-sm mb-4">
        {product.price}
      </span>
      <p className="text-slate-600 text-base">{product.description}</p>
      <p className="mt-6 text-xs text-slate-400 font-mono">
        Current Route ID Param: {id}
      </p>
    </div>
  );
}
