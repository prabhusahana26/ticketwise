// src/pages/admin/ViewProducts.jsx
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import AdminNav from "../../../components/admin/AdminNav";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/products/")
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <AdminNav />
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">All Products</h1>
        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
              >
                <h2 className="text-xl font-semibold text-blue-700">{p.name}</h2>
                <p className="text-gray-600 mt-2">{p.description}</p>
                <p className="mt-3 text-green-700 font-bold">${p.price}</p>
                <span className="mt-2 inline-block px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                  Priority: {p.priority}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
