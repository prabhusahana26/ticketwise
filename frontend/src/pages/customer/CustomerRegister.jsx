import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function CustomerRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Create customer account
      const response = await api.post("/customers", form);
  setSuccess("Account created successfully. You can now login.");
      
      // Optionally redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/customer-login");
      }, 2000);
      
    } catch (err) {
      if (err.response?.status === 409) {
  setError("Email already registered. Please use a different email.");
      } else {
  setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background-gray)' }}>
      <div className="card p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--dark-gray)' }}>
          Create Customer Account
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
              placeholder="Enter your full name"
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
              placeholder="Enter your email"
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
              placeholder="Enter your phone number"
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
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
            Already have an account?{" "}
            <button
              onClick={() => navigate("/customer-login")}
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
