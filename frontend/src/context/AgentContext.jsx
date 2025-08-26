// src/context/AgentContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AgentContext = createContext();

export const useAgent = () => useContext(AgentContext);

export const AgentProvider = ({ children }) => {
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("agent");
    if (saved) setAgent(JSON.parse(saved));
  }, []);

  const loginAsAgent = (agentData) => {
    setAgent(agentData); // store agent info
    localStorage.setItem("agent", JSON.stringify(agentData)); // persist on refresh
  };

  const logoutAgent = () => {
    setAgent(null);
    localStorage.removeItem("agent");
  };

  // load agent from localStorage on mount
  const loadAgent = () => {
    const stored = localStorage.getItem("agent");
    if (stored) setAgent(JSON.parse(stored));
  };

  return (
    <AgentContext.Provider
      value={{ agent, loginAsAgent, logoutAgent, loadAgent }}
    >
      {children}
    </AgentContext.Provider>
  );
};
