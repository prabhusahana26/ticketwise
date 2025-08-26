// src/pages/admin/CreateAgent.jsx
import { useState } from "react";
import AdminNav from "../../../components/admin/AdminNav";
import { api } from "../../../services/api"; // Use the generic api instance like CreateProduct.jsx

export default function CreateAgent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast("");
    if (!name || !email) {
      setToast("Name and Email are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/agents/", { name, email, phone });
  setToast(`Agent "${name}" created successfully.`);
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
  setToast(err?.response?.data?.detail ||"Failed to create agent.");
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <AdminNav />
      <div className="flex justify-center items-center py-12">
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">
            Create Agent
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter agent name"
                className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter agent email"
                className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter agent phone (optional)"
                className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition transform hover:scale-105 duration-200"
            >
              {loading ? "Creating..." : "Create Agent"}
            </button>
          </form>

          {toast && (
            <p className={`mt-4 font-semibold text-center ${toast.toLowerCase().includes("success") || toast.toLowerCase().includes("created") ? "text-green-600" : "text-red-600"}`}>
              {toast}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
