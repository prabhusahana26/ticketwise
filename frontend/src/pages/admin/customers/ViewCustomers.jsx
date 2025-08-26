// src/pages/admin/ViewCustomers.jsx
import { useEffect, useState } from "react";
import AdminNav from "../../../components/admin/AdminNav";
import { api } from "../../../services/api";

export default function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/customers/")
      .then((res) => setCustomers(res.data))
      .catch(() => setCustomers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <AdminNav />
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">All Customers</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : customers.length === 0 ? (
          <p className="text-center text-gray-600">No customers found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {customers.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform duration-200"
              >
                <h2 className="text-xl font-semibold mb-2"><span>Name: </span>{c.name}</h2>
                <p>Email: {c.email}</p>
                <p>Phone: {c.phone || "N/A"}</p>
                <p className="text-gray-500 text-sm">ID: {c.id}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
