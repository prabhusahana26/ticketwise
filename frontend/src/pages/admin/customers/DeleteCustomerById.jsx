// src/pages/admin/DeleteCustomerById.jsx
import { useState } from "react";
import AdminNav from "../../../components/admin/AdminNav";
import { api } from "../../../services/api";

export default function DeleteCustomerById() {
  const [customerId, setCustomerId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!customerId) return setError("Please enter a Customer ID");

    if (!confirm(`Are you sure you want to delete customer ID ${customerId}?`)) return;

    try {
      await api.delete(`/customers/${customerId}`); // DELETE /customers/{id}
      setMessage(`Customer ${customerId} deleted successfully`);
      setCustomerId("");
    } catch (err) {
      setError("Failed to delete customer");
      console.error(err);
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Delete Customer by ID</h1>

        <form onSubmit={handleDelete} className="mb-6 flex gap-2">
          <input
            type="number"
            placeholder="Enter Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="border rounded-xl p-2 flex-1"
          />
          <button
            type="submit"
            className="bg-red-600 text-white rounded-xl px-4 py-2 hover:bg-red-700 transition"
          >
            Delete
          </button>
        </form>

        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
}
