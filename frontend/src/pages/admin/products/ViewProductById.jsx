// src/pages/admin/ViewProductById.jsx
import { useState } from "react";
import { api } from "../../../services/api";
import AdminNav from "../../../components/admin/AdminNav";

export default function ViewProductById() {
  const [id, setId] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    if (!id.trim()) {
      setError("Please enter a product ID");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
      setError("");
    } catch (err) {
      const errorMessage = err?.response?.status === 404 
        ? "Product not found with this ID" 
        : "Failed to fetch product. Please try again.";
      setError(errorMessage);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchProduct();
    }
  };

  const priorityOptions = [
    { value: "low", label: "Low", color: "#28a745", bgColor: "#d4edda" },
    { value: "medium", label: "Medium", color: "#ffc107", bgColor: "#fff3cd" },
    { value: "high", label: "High", color: "#fd7e14", bgColor: "#ffeaa7" },
    { value: "critical", label: "Critical", color: "#d63031", bgColor: "#f8d7da" }
  ];

  const getPriorityStyle = (priority) => {
    const option = priorityOptions.find(p => p.value === priority);
    return option || priorityOptions[0];
  };

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
              ?
            </div>
            <h1 style={{ 
              color: 'var(--dark-gray)', 
              fontSize: '1.75rem', 
              margin: '0',
              fontWeight: '700'
            }}>
              Find Product by ID
            </h1>
          </div>
          <p style={{ 
            color: 'var(--medium-gray)', 
            fontSize: '0.9rem',
            margin: '0'
          }}>
            Enter a product ID to view detailed information
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
            <div style={{ marginBottom: '1rem' }}>
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
                      Searching...
                    </>
                  ) : (
                    <>
                      Search
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              padding: '1rem 1.25rem',
              borderRadius: '0.5rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ color: 'var(--error-red)', fontSize: '1.1rem' }}>×</span>
              <span style={{ color: 'var(--error-red)', fontWeight: '500' }}>{error}</span>
            </div>
          )}

          {/* Product Details */}
          {product && (
            <div className="card" style={{ 
              padding: '0', 
              background: 'var(--white)', 
              borderRadius: '0.875rem', 
              boxShadow: '0 6px 24px -6px rgba(0,0,0,0.1)', 
              border: '1px solid #e6e6e6',
              overflow: 'hidden'
            }}>
              {/* Header with Product Name */}
              <div style={{
                background: 'linear-gradient(135deg, var(--primary-red) 0%, var(--primary-red-dark) 100%)',
                color: 'var(--white)',
                padding: '1.5rem',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '1rem',
                  background: 'rgba(255,255,255,0.2)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  ID: {product.id}
                </div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  margin: '0',
                  paddingRight: '4rem'
                }}>
                  {product.name}
                </h2>
              </div>

              {/* Product Details */}
              <div style={{ padding: '1.5rem' }}>
                {/* Description */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ 
                    color: 'var(--dark-gray)', 
                    fontSize: '0.9rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Description
                  </h3>
                  <p style={{ 
                    color: 'var(--medium-gray)', 
                    lineHeight: '1.6',
                    margin: '0',
                    fontSize: '0.95rem'
                  }}>
                    {product.description || "No description provided"}
                  </p>
                </div>

                {/* Price and Priority */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '1.5rem',
                  marginBottom: '1rem'
                }}>
                  {/* Price */}
                  <div>
                    <h3 style={{ 
                      color: 'var(--dark-gray)', 
                      fontSize: '0.9rem', 
                      fontWeight: '600', 
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Price
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '700', 
                        color: 'var(--primary-red)'
                      }}>
                        ${product.price}
                      </span>
                    </div>
                  </div>

                  {/* Priority */}
                  <div>
                    <h3 style={{ 
                      color: 'var(--dark-gray)', 
                      fontSize: '0.9rem', 
                      fontWeight: '600', 
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Priority
                    </h3>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '1rem',
                      backgroundColor: getPriorityStyle(product.priority).bgColor,
                      border: `1px solid ${getPriorityStyle(product.priority).color}20`
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: getPriorityStyle(product.priority).color
                      }} />
                      <span style={{ 
                        color: getPriorityStyle(product.priority).color,
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        textTransform: 'capitalize'
                      }}>
                        {product.priority}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '0.5rem',
                  border: '1px solid #e9ecef'
                }}>
                  <p style={{ 
                    color: 'var(--medium-gray)', 
                    fontSize: '0.85rem',
                    margin: '0',
                    textAlign: 'center'
                  }}>
                    This product is available in your catalog and can be used for ticket creation
                  </p>
                </div>
              </div>
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
