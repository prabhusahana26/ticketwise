import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext";
import { api } from "../../services/api";

export default function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const { loginAsCustomer } = useCustomer();
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Fetch all customers
      const all = await api.get("/customers");
      const found = all.data.find(
        (c) => c.email.toLowerCase() === email.toLowerCase()
      );

      // if (found) {
      //   // ✅ Existing user found → login
      //   loginAsCustomer(found.id);
      //   nav("/");
      // } 
      if (found) {
        loginAsCustomer(found); // pass the whole object
        // nav("/CustomerDashBoard");
        // nav("/Customer/:id");
  nav(`/customer/${found.id}`);
      }
      else {
        // ❌ No user → show message
  setMsg("No account found with this email. Please check and try again.");
      }
    } catch (err) {
  setMsg("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background-gray)' }}>
      <div className="card p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--dark-gray)' }}>Customer Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMsg(""); // clear error when typing
              }}
              className="input-field"
              required
            />
          </div>
          <button className="btn-primary w-full">
            Login
          </button>
        </form>

        {/* Error / Info message */}
        {msg && (
          <div className="mt-4 p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--error-red)', color: 'var(--white)' }}>
            {msg}
          </div>
        )}

        {/* Registration Link */}
        <div className="mt-6 text-center">
          <p style={{ color: 'var(--medium-gray)' }}>
            Don't have an account?{" "}
            <button
              onClick={() => nav("/customer-register")}
              className="font-medium hover:underline"
              style={{ color: 'var(--primary-red)' }}
            >
              Create one here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
