import { useState, useEffect } from "react";
import { useAgent } from "../../context/AgentContext";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AgentProfile() {
  const { agent, logoutAgent } = useAgent();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const nav = useNavigate();

  // Fetch current agent data
  useEffect(() => {
    if (!agent?.id) return;
    api.get(`/agents/${agent.id}`)
      .then((res) =>
        setForm({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone || "",
        })
      )
      .catch(() => logoutAgent())
      .finally(() => setLoading(false));
  }, [agent]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.put(`/agents/${agent.id}`, form);
      // Auto logout after update
      logoutAgent();
      nav("/agent/login");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("This email is already registered by another agent.");
      } else {
        setError("Failed to update profile. Please try again.");
      }
    }
  };

  if (loading) return <div className="p-6 text-center">Loading profile...</div>;

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Update Agent Profile</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update
        </button>
      </form>
    </div>
  );
}
