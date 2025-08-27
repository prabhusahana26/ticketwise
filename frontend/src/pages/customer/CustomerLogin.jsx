import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext";
import { api } from "../../services/api";

export default function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginAsCustomer } = useCustomer();
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      // Fetch all customers
      const all = await api.get("/customers");
      const found = all.data.find(
        (c) => c.email.toLowerCase() === email.toLowerCase()
      );

      if (found) {
        loginAsCustomer(found); // pass the whole object
        nav(`/customer/${found.id}`);
      } else {
        setMsg("No account found with this email. Please check and try again.");
      }
    } catch (err) {
      setMsg("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: 'var(--background-gray)', 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      {/* Home Button */}
      <button
        onClick={() => nav("/")}
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--white)',
          border: '2px solid var(--primary-red)',
          borderRadius: '0.75rem',
          color: 'var(--primary-red)',
          fontWeight: '600',
          fontSize: '0.875rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: '10'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'var(--primary-red)';
          e.target.style.color = 'var(--white)';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(214, 48, 49, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'var(--white)';
          e.target.style.color = 'var(--primary-red)';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }}
      >
        <span>←</span>
        <span>Back to Home</span>
      </button>

      {/* Admin Login Link */}
      <button
        onClick={() => nav("/admin/login")}
        style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--white)',
          border: '2px solid var(--medium-gray)',
          borderRadius: '0.75rem',
          color: 'var(--medium-gray)',
          fontWeight: '600',
          fontSize: '0.875rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: '10'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'var(--medium-gray)';
          e.target.style.color = 'var(--white)';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(99, 110, 114, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'var(--white)';
          e.target.style.color = 'var(--medium-gray)';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }}
      >
        <span style={{ fontSize: '1rem' }}>⚙</span>
        <span>Admin</span>
      </button>

      {/* Login Card */}
      <div style={{
        backgroundColor: 'var(--white)',
        borderRadius: '1rem',
        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
        border: '1px solid #e6e6e6',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '420px',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            backgroundColor: 'var(--primary-red)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 8px 20px rgba(214, 48, 49, 0.3)'
          }}>
            <span style={{ 
              color: 'var(--white)', 
              fontSize: '1.5rem', 
              fontWeight: 'bold' 
            }}>
              C
            </span>
          </div>
          <h1 style={{ 
            color: 'var(--dark-gray)', 
            fontSize: '1.75rem', 
            fontWeight: '700',
            margin: '0 0 0.5rem 0'
          }}>
            Customer Portal
          </h1>
          <p style={{ 
            color: 'var(--medium-gray)', 
            fontSize: '0.9rem',
            margin: '0'
          }}>
            Access your tickets and support requests
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1.25rem' }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600', 
              color: 'var(--dark-gray)',
              fontSize: '0.875rem'
            }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="customer@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMsg(""); // clear error when typing
              }}
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
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
            <p style={{ 
              color: 'var(--medium-gray)', 
              fontSize: '0.8rem',
              margin: '0.5rem 0 0 0'
            }}>
              Enter the email address associated with your account
            </p>
          </div>

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
              boxShadow: '0 4px 14px -2px rgba(214, 48, 49, 0.3)',
              opacity: loading ? '0.7' : '1',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px -4px rgba(214, 48, 49, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 14px -2px rgba(214, 48, 49, 0.3)';
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
                Accessing Account...
              </>
            ) : (
              'Access Account'
            )}
          </button>
        </form>

        {/* Error Message */}
        {msg && (
          <div style={{
            marginTop: '1.25rem',
            padding: '1rem 1.25rem',
            borderRadius: '0.5rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ color: 'var(--error-red)', fontSize: '1.1rem' }}>×</span>
            <span style={{ color: 'var(--error-red)', fontWeight: '500' }}>{msg}</span>
          </div>
        )}

        {/* Registration Link */}
        <div style={{ 
          marginTop: '2rem', 
          textAlign: 'center',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e6e6e6'
        }}>
          <p style={{ 
            color: 'var(--medium-gray)',
            fontSize: '0.875rem',
            margin: '0'
          }}>
            Don't have an account?{" "}
            <button
              onClick={() => nav("/customer-register")}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-red)',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '0.875rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'var(--primary-red-dark)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--primary-red)';
              }}
            >
              Create one here
            </button>
          </p>
        </div>

        {/* Additional Info */}
        <div style={{ 
          marginTop: '1rem', 
          textAlign: 'center'
        }}>
          <p style={{ 
            color: 'var(--medium-gray)',
            fontSize: '0.8rem',
            margin: '0'
          }}>
            Need help?{" "}
            <button
              onClick={() => nav("/")}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-red)',
                fontWeight: '500',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '0.8rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'var(--primary-red-dark)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--primary-red)';
              }}
            >
              Contact support
            </button>
          </p>
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
