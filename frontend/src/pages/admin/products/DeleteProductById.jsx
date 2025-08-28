import { useState } from "react";
import { api } from "../../../services/api";
import AdminNav from "../../../components/admin/AdminNav";

export default function DeleteProductById() {
  const [id, setId] = useState("");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast("");

    try {
      await api.delete(`/products/${id}`);
      setToast("Product deleted successfully.");
      setId(""); // Clear the input field
    } catch (error) {
      const errorMessage =
        error?.response?.status === 404
          ? "Product not found with this ID"
          : "Failed to delete the product. Please try again.";
      setToast(errorMessage);
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 4000);
    }
  };

  return (
    <div style={{ backgroundColor: "var(--background-gray)", minHeight: "100vh" }}>
      <AdminNav />
      <div className="page-wrapper" style={{ padding: "1.5rem" }}>
        <header style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              marginBottom: "0.5rem",
            }}
          >
            <div
              className="icon-circle-sm"
              style={{
                width: "2rem",
                height: "2rem",
                margin: "0",
                fontSize: "0.9rem",
              }}
            >
              🗑
            </div>
            <h1
              style={{
                color: "var(--dark-gray)",
                fontSize: "1.75rem",
                margin: "0",
                fontWeight: "700",
              }}
            >
              Delete Product
            </h1>
          </div>
          <p
            style={{
              color: "var(--medium-gray)",
              fontSize: "0.9rem",
              margin: "0",
            }}
          >
            Enter the product ID to delete the product
          </p>
        </header>

        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {/* Delete Section */}
          <div
            className="card"
            style={{
              padding: "1.5rem",
              background: "var(--white)",
              borderRadius: "0.875rem",
              boxShadow: "0 6px 24px -6px rgba(0,0,0,0.1)",
              border: "1px solid #e6e6e6",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ marginBottom: "0.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "var(--dark-gray)",
                  fontSize: "0.9rem",
                }}
              >
                Product ID
              </label>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "stretch" }}>
                <input
                  type="number"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Enter product ID (e.g., 1, 2, 3...)"
                  style={{
                    flex: "1",
                    padding: "0.875rem",
                    fontSize: "0.95rem",
                    borderRadius: "0.5rem",
                    border: "2px solid var(--light-gray)",
                    transition: "all 0.2s ease",
                    backgroundColor: "var(--white)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--primary-red)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(214, 48, 49, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--light-gray)";
                    e.target.style.boxShadow = "none";
                  }}
                  required
                />
                <button
                  onClick={handleDelete}
                  disabled={loading || !id.trim()}
                  className="btn-primary"
                  style={{
                    padding: "0.875rem 1.5rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    boxShadow: "0 3px 12px -2px rgba(214, 48, 49, 0.25)",
                    opacity: loading || !id.trim() ? "0.6" : "1",
                    cursor: loading || !id.trim() ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && id.trim()) {
                      e.target.style.transform = "translateY(-1px)";
                      e.target.style.boxShadow = "0 6px 16px -2px rgba(214, 48, 49, 0.35)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading && id.trim()) {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 3px 12px -2px rgba(214, 48, 49, 0.25)";
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <div
                        style={{
                          display: "inline-block",
                          width: "16px",
                          height: "16px",
                          border: "2px solid transparent",
                          borderTop: "2px solid var(--white)",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                          marginRight: "0.5rem",
                        }}
                      />
                      Deleting...
                    </>
                  ) : (
                    "Delete Product"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Toast Message */}
          {toast && (
            <div
              style={{
                padding: "1rem 1.25rem",
                borderRadius: "0.5rem",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: toast.toLowerCase().includes("success")
                  ? "#d4edda"
                  : "#fef2f2",
                border: `1px solid ${
                  toast.toLowerCase().includes("success") ? "#c3e6cb" : "#fecaca"
                }`,
                color: toast.toLowerCase().includes("success")
                  ? "var(--success-green)"
                  : "var(--error-red)",
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>
                {toast.toLowerCase().includes("success") ? "✓" : "×"}
              </span>
              <span style={{ fontWeight: "500" }}>{toast}</span>
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