// src/pages/admin/DeleteProductById.jsx
import { useState } from "react";
import { api } from "../../../services/api";
import AdminNav from "../../../components/admin/AdminNav";

export default function DeleteProductById() {
  const [id, setId] = useState("");
  const [toast, setToast] = useState("");

  const handleDelete = async () => {
    try {
      await api.delete(`/products/${id}`);
  setToast("Product deleted successfully.");
    } catch {
  setToast("Failed to delete product.");
    }
    setTimeout(() => setToast(""), 4000);
  };

  return (
    <div>
      <AdminNav />
      <div className="max-w-xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Delete Product</h1>
        <div className="flex gap-3">
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter product ID"
            className="flex-grow border rounded-lg p-3"
          />
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
        {toast && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
