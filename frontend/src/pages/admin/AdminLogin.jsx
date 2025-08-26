import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAdminAuth(); // get login function from context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/admins/login", form); // login API
      login(res.data); // store admin data in context
      navigate("/admin/dashboard"); // redirect to dashboard
    } catch (err) {
  setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background-gray)' }}>
      <div className="card p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--dark-gray)' }}>
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="input-field"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && (
          <div className="mt-4 p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--error-red)', color: 'var(--white)' }}>
            {error}
          </div>
        )}

        {/* Registration Link */}
        <div className="mt-6 text-center">
          <p style={{ color: 'var(--medium-gray)' }}>
            Need to create an admin account?{" "}
            <button
              onClick={() => navigate("/admin/register")}
              className="font-medium hover:underline"
              style={{ color: 'var(--primary-red)' }}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
