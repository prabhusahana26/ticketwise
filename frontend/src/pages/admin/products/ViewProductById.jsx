// src/pages/admin/ViewProductById.jsx
import { useState } from "react";
import { api } from "../../../services/api";
import AdminNav from "../../../components/admin/AdminNav";

export default function ViewProductById() {
  const [id, setId] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
      setError("");
    } catch {
  setError("Product not found.");
      setProduct(null);
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="max-w-xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Find Product by ID</h1>
        <div className="flex gap-3">
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter product ID"
            className="flex-grow border rounded-lg p-3"
          />
          <button
            onClick={fetchProduct}
            className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-600 mt-4">{error}</p>}
        {product && (
          <div className="mt-6 bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold text-blue-700">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="mt-3 text-green-700 font-bold">${product.price}</p>
            <p className="text-sm mt-2">Priority: {product.priority}</p>
          </div>
        )}
      </div>
    </div>
  );
}
