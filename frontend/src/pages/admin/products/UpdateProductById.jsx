// src/pages/admin/UpdateProductById.jsx
import { useState } from "react";
import { api } from "../../../services/api";
import AdminNav from "../../../components/admin/AdminNav";

export default function UpdateProductById() {
  const [id, setId] = useState("");
  const [form, setForm] = useState({});
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const fetchProduct = async () => {
    if (!id.trim()) {
      setToast("Please enter a product ID");
      return;
    }

    setLoading(true);
    setToast("");
    try {
      const res = await api.get(`/products/${id}`);
      setForm(res.data);
      setToast("");
    } catch (err) {
      const errorMessage = err?.response?.status === 404 
        ? "Product not found with this ID" 
        : "Failed to fetch product. Please try again.";
      setToast(errorMessage);
      setForm({});
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setUpdating(true);
    setToast("");
    try {
      await api.put(`/products/${id}`, {
        ...form,
        price: parseFloat(form.price),
      });
      setToast("Product updated successfully.");
    } catch (err) {
      const errorMessage = err?.response?.data?.detail || 
                          err?.message || 
                          "Failed to update product. Please try again.";
      setToast(errorMessage);
    } finally {
      setUpdating(false);
      setTimeout(() => setToast(""), 4000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchProduct();
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
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
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
              ✏
            </div>
            <h1 style={{ 
              color: 'var(--dark-gray)', 
              fontSize: '1.75rem', 
              margin: '0',
              fontWeight: '700'
            }}>
              Update Product
            </h1>
          </div>
          <p style={{ 
            color: 'var(--medium-gray)', 
            fontSize: '0.9rem',
            margin: '0'
          }}>
            Search for a product and update its information
          </p>
        </header>

        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {/* Search Section */}
          <div className="card" style={{ 
            padding: '1.5rem', 
            background: 'var(--white)', 
            borderRadius: '0.875rem', 
            boxShadow: '0 6px 24px -6px rgba(0,0,0,0.1)', 
            border: '1px solid #e6e6e6',
            marginBottom: '1.5rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600', 
                color: 'var(--dark-gray)',
                fontSize: '0.9rem'
              }}>
                Product ID
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'stretch' }}>
                <input
                  type="number"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter product ID (e.g., 1, 2, 3...)"
                  style={{
                    flex: '1',
                    padding: '0.875rem',
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
                />
                <button
                  onClick={fetchProduct}
                  disabled={loading || !id.trim()}
                  className="btn-primary"
                  style={{
                    padding: '0.875rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    boxShadow: '0 3px 12px -2px rgba(214, 48, 49, 0.25)',
                    opacity: (loading || !id.trim()) ? '0.6' : '1',
                    cursor: (loading || !id.trim()) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && id.trim()) {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 6px 16px -2px rgba(214, 48, 49, 0.35)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading && id.trim()) {
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
                      Loading...
                    </>
                  ) : (
                    'Load Product'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Toast Message */}
          {toast && (
            <div style={{
              padding: '1rem 1.25rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: toast.toLowerCase().includes("success") ? '#d4edda' : '#fef2f2',
              border: `1px solid ${toast.toLowerCase().includes("success") ? '#c3e6cb' : '#fecaca'}`,
              color: toast.toLowerCase().includes("success") ? 'var(--success-green)' : 'var(--error-red)'
            }}>
              <span style={{ fontSize: '1.1rem' }}>
                {toast.toLowerCase().includes("success") ? '✓' : '×'}
              </span>
              <span style={{ fontWeight: '500' }}>{toast}</span>
            </div>
          )}

          {/* Update Form */}
          {form?.id && (
            <div className="card" style={{ 
              padding: '1.75rem', 
              background: 'var(--white)', 
              borderRadius: '0.875rem', 
              boxShadow: '0 6px 24px -6px rgba(0,0,0,0.1)', 
              border: '1px solid #e6e6e6' 
            }}>
              <div style={{ 
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '0.5rem',
                border: '1px solid #e9ecef'
              }}>
                <p style={{ 
                  color: 'var(--medium-gray)', 
                  fontSize: '0.875rem',
                  margin: '0',
                  textAlign: 'center'
                }}>
                  Editing Product ID: <strong style={{ color: 'var(--primary-red)' }}>#{form.id}</strong>
                </p>
              </div>

              <form style={{ display: 'grid', gap: '1rem' }} onSubmit={(e) => e.preventDefault()}>
                
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
                    value={form.name || ""}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
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
                        value={form.price || ""}
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
                        value={form.priority || "low"}
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
                        backgroundColor: priorityOptions.find(p => p.value === (form.priority || "low"))?.color
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
                    placeholder="Product description"
                    value={form.description || ""}
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

                {/* Update Button */}
                <button
                  onClick={handleUpdate}
                  disabled={updating}
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
                    opacity: updating ? '0.7' : '1',
                    cursor: updating ? 'not-allowed' : 'pointer',
                    transform: updating ? 'none' : 'translateY(0)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!updating) {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 6px 16px -2px rgba(214, 48, 49, 0.35)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!updating) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 3px 12px -2px rgba(214, 48, 49, 0.25)';
                    }
                  }}
                >
                  {updating ? (
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
                      Updating...
                    </>
                  ) : (
                    'Update Product'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Add keyframes for animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
