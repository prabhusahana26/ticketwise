// src/pages/admin/UpdateProductById.jsx
import { useState } from "react";
import { api } from "../../../services/api";
import AdminNav from "../../../components/admin/AdminNav";

export default function UpdateProductById() {
  const [id, setId] = useState("");
  const [form, setForm] = useState({});
  const [toast, setToast] = useState("");

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setForm(res.data);
      setToast("");
    } catch {
  setToast("Product not found.");
      setForm({});
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/products/${id}`, {
        ...form,
        price: parseFloat(form.price),
      });
  setToast("Product updated successfully.");
    } catch {
  setToast("Failed to update product.");
    }
    setTimeout(() => setToast(""), 4000);
  };

  return (
    <div>
      <AdminNav />
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Update Product</h1>
        <div className="flex gap-3 mb-6">
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
            Load
          </button>
        </div>

        {form?.id && (
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
            <button
              onClick={handleUpdate}
              className="w-full bg-green-600 text-white rounded-lg py-3 hover:bg-green-700"
            >
              Update
            </button>
          </div>
        )}
        {toast && (
          <div className="mt-4 p-3 bg-blue-100 text-blue-700 rounded-lg text-center">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
