import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAgent } from "../../context/AgentContext"; // make sure you have AgentContext
import { api } from "../../services/api";

export default function AgentLogin() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const { loginAsAgent } = useAgent(); // context function to store logged-in agent
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Fetch all agents
      const all = await api.get("/agents");
      const found = all.data.find(
        (a) => a.email.toLowerCase() === email.toLowerCase()
      );

      if (found) {
        loginAsAgent(found); // store agent info in context
        nav("/agent/dashboard"); // navigate to agent dashboard
      } else {
        setMsg("❌ No account found with this email. Please check and try again.");
      }
    } catch (err) {
      setMsg("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Agent Login</h2>
      <form className="space-y-3" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMsg(""); // clear message on typing
          }}
          className="border px-3 py-2 rounded w-full"
          required
        />
        <button className="bg-black text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>

      {msg && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {msg}
        </div>
      )}
    </div>
  );
}
