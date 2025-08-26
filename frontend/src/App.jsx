import './index.css';
import { Routes, Route, Navigate } from "react-router-dom";

// Contexts
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { AgentProvider } from "./context/AgentContext";
import { CustomerProvider } from "./context/CustomerContext";
import { TicketsProvider } from "./context/TicketsContext";

// Components
import RedirectIfLoggedIn from "./components/Auth/RedirectIfLoggedIn";
import RequireAuth from "./components/Auth/RequireAuth";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";

// Admin Components
import AdminNav from "./components/Admin/AdminNav";

// Admin Pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminRegister from "./pages/Admin/AdminRegister";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProfile from "./pages/Admin/AdminProfile";

// Admin Products
import Products from "./pages/Admin/Products/Products";
import CreateProduct from "./pages/Admin/Products/CreateProduct";
import ViewProducts from "./pages/Admin/Products/ViewProducts";
import ViewProductById from "./pages/Admin/Products/ViewProductById";
import UpdateProductById from "./pages/Admin/Products/UpdateProductById";
import DeleteProductById from "./pages/Admin/Products/DeleteProductById";

// Admin Customers
import Customer from "./pages/Admin/Customers/Customer";
import ViewCustomers from "./pages/Admin/Customers/ViewCustomers";
import ViewCustomerById from "./pages/Admin/Customers/ViewCustomerById";
import DeleteCustomerById from "./pages/Admin/Customers/DeleteCustomerById";

// Admin Agents
import Agent from "./pages/Admin/Agents/Agent";
import CreateAgent from "./pages/Admin/Agents/CreateAgent";
import ViewAgents from "./pages/Admin/Agents/ViewAgents";
import ViewAgentById from "./pages/Admin/Agents/ViewAgentById";
import ViewAgentTickets from "./pages/Admin/Agents/ViewAgentTickets";
import DeleteAgentById from "./pages/Admin/Agents/DeleteAgentById";

// Admin Tickets
import Tickets from "./pages/Admin/Tickets/Tickets";
import ViewTickets from "./pages/Admin/Tickets/ViewTickets";
import ViewTicketById from "./pages/Admin/Tickets/ViewTicketById";

// Agent Pages
import AgentLogin from "./pages/Agent/AgentLogin";
import AgentDashboard from "./pages/Agent/AgentDashboard";
import AgentTicketsPage from "./pages/Agent/AgentTicketsPage";
import AgentTicketDetails from "./pages/Agent/AgentTicketDetails";
import AgentProfile from "./pages/Agent/AgentProfile";

// Customer Pages
import CustomerLogin from "./pages/Customer/CustomerLogin";
import CustomerRegister from "./pages/Customer/CustomerRegister";
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import CustomerProfile from "./pages/Customer/CustomerProfile";
import ProductsPage from "./pages/Customer/ProductsPage";
import ProductDetails from "./pages/Customer/ProductDetails";
import TicketsPage from "./pages/Customer/TicketsPage";
import RaiseTicket from "./pages/Customer/RaiseTicket";
import TicketDetails from "./pages/Customer/TicketDetails";

// Home Page
import HomePage from "./pages/HomePage";

function App() {
  return (
    <AdminAuthProvider>
      <AgentProvider>
        <CustomerProvider>
          <TicketsProvider>
            <Routes>
              {/* -------- Home -------- */}
              <Route path="/" element={<HomePage />} />

              {/* -------- Customer -------- */}
              <Route path="/customer-login" element={<CustomerLogin />} />
              <Route path="/customer-register" element={<CustomerRegister />} />
              <Route path="/customer/:id" element={<CustomerDashboard />} />
              <Route path="/customer/profile" element={<CustomerProfile />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/tickets/new" element={<RaiseTicket />} />
              <Route path="/tickets/:id" element={<TicketDetails />} />

              {/* -------- Agent -------- */}
              <Route path="/agent/login" element={<AgentLogin />} />
              <Route path="/agent/dashboard" element={<AgentDashboard />} />
              <Route path="/agent/tickets" element={<AgentTicketsPage />} />
              <Route path="/agent/tickets/:id" element={<AgentTicketDetails />} />
              <Route path="/agent/profile" element={<AgentProfile />} />

              {/* -------- Admin -------- */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
              <Route path="/admin/profile" element={<AdminProtectedRoute><AdminProfile /></AdminProtectedRoute>} />

              {/* Admin Products */}
              <Route path="/admin/products" element={<AdminProtectedRoute><Products /></AdminProtectedRoute>} />
              <Route path="/admin/products/create" element={<AdminProtectedRoute><CreateProduct /></AdminProtectedRoute>} />
              <Route path="/admin/products/view" element={<AdminProtectedRoute><ViewProducts /></AdminProtectedRoute>} />
              <Route path="/admin/products/view/:id" element={<AdminProtectedRoute><ViewProductById /></AdminProtectedRoute>} />
              <Route path="/admin/products/update/:id" element={<AdminProtectedRoute><UpdateProductById /></AdminProtectedRoute>} />
              <Route path="/admin/products/delete/:id" element={<AdminProtectedRoute><DeleteProductById /></AdminProtectedRoute>} />

              {/* Admin Customers */}
              <Route path="/admin/customers" element={<AdminProtectedRoute><Customer /></AdminProtectedRoute>} />
              <Route path="/admin/customers/view" element={<AdminProtectedRoute><ViewCustomers /></AdminProtectedRoute>} />
              <Route path="/admin/customers/view-by-id" element={<AdminProtectedRoute><ViewCustomerById /></AdminProtectedRoute>} />
              <Route path="/admin/customers/delete" element={<AdminProtectedRoute><DeleteCustomerById /></AdminProtectedRoute>} />

              {/* Admin Agents */}
              <Route path="/admin/agents" element={<AdminProtectedRoute><Agent /></AdminProtectedRoute>} />
              <Route path="/admin/agents/create" element={<AdminProtectedRoute><CreateAgent /></AdminProtectedRoute>} />
              <Route path="/admin/agents/view" element={<AdminProtectedRoute><ViewAgents /></AdminProtectedRoute>} />
              <Route path="/admin/agents/view-by-id" element={<AdminProtectedRoute><ViewAgentById /></AdminProtectedRoute>} />
              <Route path="/admin/agents/tickets" element={<AdminProtectedRoute><ViewAgentTickets /></AdminProtectedRoute>} />
              <Route path="/admin/agents/delete" element={<AdminProtectedRoute><DeleteAgentById /></AdminProtectedRoute>} />

              {/* Admin Tickets */}
              <Route path="/admin/tickets" element={<AdminProtectedRoute><Tickets /></AdminProtectedRoute>} />
              <Route path="/admin/view-tickets" element={<AdminProtectedRoute><ViewTickets /></AdminProtectedRoute>} />
              <Route path="/admin/view-ticket-by-id" element={<AdminProtectedRoute><ViewTicketById /></AdminProtectedRoute>} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </TicketsProvider>
        </CustomerProvider>
      </AgentProvider>
    </AdminAuthProvider>
  );
}

export default App;
