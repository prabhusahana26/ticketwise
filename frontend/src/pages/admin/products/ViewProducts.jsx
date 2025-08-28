import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import AdminNav from "../../../components/admin/AdminNav";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/products/")
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

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
              📦
            </div>
            <h1
              style={{
                color: "var(--dark-gray)",
                fontSize: "1.75rem",
                margin: "0",
                fontWeight: "700",
              }}
            >
              View Products
            </h1>
          </div>
          <p
            style={{
              color: "var(--medium-gray)",
              fontSize: "0.9rem",
              margin: "0",
            }}
          >
            Browse through the list of all available products
          </p>
        </header>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
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
            {loading ? (
              <p style={{ textAlign: "center", color: "var(--medium-gray)" }}>
                Loading products...
              </p>
            ) : products.length === 0 ? (
              <p style={{ textAlign: "center", color: "var(--medium-gray)" }}>
                No products found.
              </p>
            ) : (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "0.75rem",
                        borderBottom: "2px solid var(--light-gray)",
                        color: "var(--dark-gray)",
                        fontWeight: "600",
                      }}
                    >
                      ID
                    </th>
                    <th
                      style={{
                        padding: "0.75rem",
                        borderBottom: "2px solid var(--light-gray)",
                        color: "var(--dark-gray)",
                        fontWeight: "600",
                      }}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        padding: "0.75rem",
                        borderBottom: "2px solid var(--light-gray)",
                        color: "var(--dark-gray)",
                        fontWeight: "600",
                      }}
                    >
                      Price
                    </th>
                    <th
                      style={{
                        padding: "0.75rem",
                        borderBottom: "2px solid var(--light-gray)",
                        color: "var(--dark-gray)",
                        fontWeight: "600",
                      }}
                    >
                      Priority
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td
                        style={{
                          padding: "0.75rem",
                          borderBottom: "1px solid var(--light-gray)",
                          color: "var(--medium-gray)",
                        }}
                      >
                        {product.id}
                      </td>
                      <td
                        style={{
                          padding: "0.75rem",
                          borderBottom: "1px solid var(--light-gray)",
                          color: "var(--medium-gray)",
                        }}
                      >
                        {product.name}
                      </td>
                      <td
                        style={{
                          padding: "0.75rem",
                          borderBottom: "1px solid var(--light-gray)",
                          color: "var(--medium-gray)",
                        }}
                      >
                        ${product.price.toFixed(2)}
                      </td>
                      <td
                        style={{
                          padding: "0.75rem",
                          borderBottom: "1px solid var(--light-gray)",
                          color: "var(--medium-gray)",
                        }}
                      >
                        {product.priority.charAt(0).toUpperCase() +
                          product.priority.slice(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}