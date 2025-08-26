import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../../services/api";
import { useCustomer } from "../../context/CustomerContext";
import { useTickets } from "../../context/TicketsContext";
import CustomerNav from "../../components/customer/CustomerNav";

export default function RaiseTicket() {
  const nav = useNavigate();
  const location = useLocation();
  const { customerId } = useCustomer();
  const { addTicket } = useTickets();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");
  const [ticketId, setTicketId] = useState(null); // for update

  // Prefill if update
  useEffect(() => {
    if (location.state?.ticket) {
      const t = location.state.ticket;
      setTitle(t.title);
      setDescription(t.description);
      setPriority(t.priority);
      setProductId(t.product_id);
      setTicketId(t.id);
    }
  }, [location.state]);

  // Redirect if not logged in
  useEffect(() => {
  if (!customerId) nav("/customer-login");
  }, [customerId, nav]);

  // Fetch products
  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to load products", err));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (ticketId) {
        // Update existing ticket
        const res = await api.put(`/tickets/${ticketId}`, {
          title,
          description,
          priority,
          product_id: parseInt(productId, 10),
          customer_id: customerId,
        });
        addTicket(res.data); // update in context
         // ✅ Redirect to TicketDetails with toast message
      nav(`/tickets/${ticketId}`, {
        state: { toastMessage: `Ticket #${ticketId} updated successfully` }
      });
      } else {
        // New ticket
        const res = await api.post("/tickets", {
          title,
          description,
          priority,
          product_id: parseInt(productId, 10),
          customer_id: customerId,
        });
        addTicket(res.data);
        nav(`/tickets/${res.data.id}`);
      }
    } catch (err) {
      setMsg(err?.response?.data?.detail || "Failed to create ticket");
    }
  };

  return (
    <div>
      <CustomerNav />
      <div className="p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">{ticketId ? "Update Ticket" : "Raise Ticket"}</h2>
        <form className="space-y-3" onSubmit={submit}>
          <select
            className="border px-3 py-2 rounded w-full"
            value={productId}
            onChange={e => setProductId(e.target.value)}
            required
          >
            <option value="">-- Select Product --</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name} - {p.description}</option>
            ))}
          </select>

          <input
            className="border px-3 py-2 rounded w-full"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            className="border px-3 py-2 rounded w-full"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe your issue"
            required
          />
          <select
            className="border px-3 py-2 rounded w-full"
            value={priority}
            onChange={e => setPriority(e.target.value)}
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
            <option value="critical">critical</option>
          </select>

          <button className="bg-black text-white px-4 py-2 rounded w-full">
            {ticketId ? "Update Ticket" : "Submit Ticket"}
          </button>
        </form>
        {msg && <p className="mt-3 text-red-600">{msg}</p>}
      </div>
    </div>
  );
}
