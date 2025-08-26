import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { useCustomer } from "./CustomerContext";

const TicketsContext = createContext();

export function TicketsProvider({ children }) {
  const { customerId } = useCustomer();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    if (!customerId) return;
    setLoading(true);
    try {
      const res = await api.get("/tickets"); // returns all
      const mine = res.data.filter((t) => t.customer_id === customerId);
      setTickets(mine);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTickets(); }, [customerId]);

  const addTicket = (ticket) => setTickets((prev) => [ticket, ...prev]);
  const updateTicket = (ticket) =>
    setTickets((prev) => prev.map((t) => (t.id === ticket.id ? ticket : t)));

  // ✅ Remove ticket from context
  const removeTicket = (ticketId) => {
    setTickets(prev => prev.filter((t) => t.id !== ticketId));
  };

  // KPIs
  const total = tickets.length;
  const resolved = tickets.filter((t) => t.status === "closed").length;
  const pending = useMemo(() => {
    // pending = anything not closed
    return tickets.filter((t) => t.status !== "closed").length;
  }, [tickets]);

  return (
    <TicketsContext.Provider value={{
      tickets,
      loading,
      fetchTickets,
      addTicket,
      updateTicket,
      removeTicket, // ✅ added here
      kpis: { total, pending, resolved }
    }}>
      {children}
    </TicketsContext.Provider>
  );
}

export const useTickets = () => useContext(TicketsContext);
