import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function AdminRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (form.password !== form.confirmPassword) {
  setError("Passwords do not match");
      return false;
    }
    if (form.password.length < 6) {
  setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Create admin account (exclude confirmPassword from API call)
      const { confirmPassword, ...adminData } = form;
      const response = await api.post("/admins", adminData);
      
  setSuccess("Admin account created successfully. You can now login.");
      
      // Optionally redirect to admin login after 2 seconds
      setTimeout(() => {
        navigate("/admin/login");
      }, 2000);
      
    } catch (err) {
      if (err.response?.status === 409) {
  setError("Email already registered. Please use a different email.");
      } else {
  setError("Failed to create admin account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background-gray)' }}>
      <div className="card p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--dark-gray)' }}>
          Create Admin Account
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password (min 6 characters)"
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Admin Account"}
          </button>
        </form>

        {/* Success Message */}
        {success && (
          <div className="mt-4 p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--success-green)', color: 'var(--white)' }}>
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--error-red)', color: 'var(--white)' }}>
            {error}
          </div>
        )}

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p style={{ color: 'var(--medium-gray)' }}>
            Already have an admin account?{" "}
            <button
              onClick={() => navigate("/admin/login")}
              className="font-medium hover:underline"
              style={{ color: 'var(--primary-red)' }}
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
