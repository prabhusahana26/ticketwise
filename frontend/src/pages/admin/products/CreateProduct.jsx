// src/pages/admin/CreateProduct.jsx
import { useState } from "react";
import { api } from "../../../services/api";
import AdminNav from "../../../components/admin/AdminNav";

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    priority: "low",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/products/", {
        ...form,
        price: parseFloat(form.price),
      });
      setToast("Product created successfully.");
      setForm({ name: "", description: "", price: "", priority: "low" });
    } catch (err) {
      setToast("Failed to create product.");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 4000);
    }
  };

  const priorityOptions = [
    { value: "low", label: "Low Priority", color: "#28a745" },
    { value: "medium", label: "Medium Priority", color: "#ffc107" },
    { value: "high", label: "High Priority", color: "#fd7e14" },
    { value: "critical", label: "Critical Priority", color: "#d63031" }
  ];

  return (
    <div style={{ backgroundColor: 'var(--background-gray)', minHeight: '100vh' }}>
      <AdminNav />
      <div className="page-wrapper" style={{ padding: '1.5rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '0.75rem',
            marginBottom: '0.5rem' 
          }}>
            <div className="icon-circle-sm" style={{ 
              width: '2rem', 
              height: '2rem', 
              margin: '0',
              fontSize: '0.9rem' 
            }}>
              +
            </div>
            <h1 style={{ 
              color: 'var(--dark-gray)', 
              fontSize: '1.75rem', 
              margin: '0',
              fontWeight: '700'
            }}>
              Create New Product
            </h1>
          </div>
          <p style={{ 
            color: 'var(--medium-gray)', 
            fontSize: '0.9rem',
            margin: '0'
          }}>
            Add a new product to your catalog
          </p>
        </header>

        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="card" style={{ 
            padding: '1.75rem', 
            background: 'var(--white)', 
            borderRadius: '0.875rem', 
            boxShadow: '0 6px 24px -6px rgba(0,0,0,0.1)', 
            border: '1px solid #e6e6e6' 
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
              
              {/* Product Name */}
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.375rem', 
                  fontWeight: '600', 
                  color: 'var(--dark-gray)',
                  fontSize: '0.875rem'
                }}>
                  Product Name *
                </label>
                <input
                  name="name"
                  placeholder="Enter product name"
                  value={form.name}
                  onChange={handleChange}
                  className="input-field"
                  style={{
                    padding: '0.75rem',
                    fontSize: '0.95rem',
                    borderRadius: '0.5rem',
                    border: '2px solid var(--light-gray)',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'var(--white)'
                  }}
                  required
                />
              </div>

              {/* Price and Priority Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Price */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.375rem', 
                    fontWeight: '600', 
                    color: 'var(--dark-gray)',
                    fontSize: '0.875rem'
                  }}>
                    Price *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{
                      position: 'absolute',
                      left: '0.875rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--medium-gray)',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      zIndex: '1'
                    }}>
                      $
                    </span>
                    <input
                      name="price"
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.price}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        paddingLeft: '2rem',
                        paddingRight: '0.75rem',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        fontSize: '0.95rem',
                        borderRadius: '0.5rem',
                        border: '2px solid var(--light-gray)',
                        transition: 'all 0.2s ease',
                        backgroundColor: 'var(--white)'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-red)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(214, 48, 49, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--light-gray)';
                        e.target.style.boxShadow = 'none';
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.375rem', 
                    fontWeight: '600', 
                    color: 'var(--dark-gray)',
                    fontSize: '0.875rem'
                  }}>
                    Priority
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      name="priority"
                      value={form.priority}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        fontSize: '0.95rem',
                        borderRadius: '0.5rem',
                        border: '2px solid var(--light-gray)',
                        transition: 'all 0.2s ease',
                        backgroundColor: 'var(--white)',
                        cursor: 'pointer',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1rem 1rem',
                        paddingRight: '2.25rem'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-red)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(214, 48, 49, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--light-gray)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {priorityOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label.replace(' Priority', '')}
                        </option>
                      ))}
                    </select>
                    <div style={{
                      position: 'absolute',
                      right: '2.5rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: priorityOptions.find(p => p.value === form.priority)?.color
                    }} />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.375rem', 
                  fontWeight: '600', 
                  color: 'var(--dark-gray)',
                  fontSize: '0.875rem'
                }}>
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Brief product description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '0.95rem',
                    borderRadius: '0.5rem',
                    border: '2px solid var(--light-gray)',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'var(--white)',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary-red)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(214, 48, 49, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--light-gray)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '0.875rem 1.25rem',
                  marginTop: '0.5rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 3px 12px -2px rgba(214, 48, 49, 0.25)',
                  opacity: loading ? '0.7' : '1',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transform: loading ? 'none' : 'translateY(0)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 6px 16px -2px rgba(214, 48, 49, 0.35)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 3px 12px -2px rgba(214, 48, 49, 0.25)';
                  }
                }}
              >
                {loading ? (
                  <>
                    <div style={{
                      display: 'inline-block',
                      width: '16px',
                      height: '16px',
                      border: '2px solid transparent',
                      borderTop: '2px solid var(--white)',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginRight: '0.5rem'
                    }} />
                    Creating...
                  </>
                ) : (
                  <>
                    <span style={{ marginRight: '0.5rem' }}>+</span>
                    Create Product
                  </>
                )}
              </button>
            </form>

            {/* Toast Message */}
            {toast && (
              <div 
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  backgroundColor: toast.toLowerCase().includes("success") ? 'var(--success-green)' : 'var(--error-red)',
                  color: 'var(--white)',
                  boxShadow: '0 3px 12px -2px rgba(0,0,0,0.1)',
                  animation: 'slideIn 0.3s ease'
                }}
              >
                {toast.toLowerCase().includes("success") ? "✅" : "❌"} {toast}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add keyframes for animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
