// import { useState } from "react";
// import { api } from "../../../services/api";
// import AdminNav from "../../../components/admin/AdminNav";

// export default function CreateProduct() {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     priority: "low", // ✅ default value restored
//   });
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await api.post("/products/", {
//         ...form,
//         price: parseFloat(form.price),
//       });
//       setToast("Product created successfully.");
//       setForm({ name: "", description: "", price: "", priority: "low" }); // ✅ reset matches initial state
//     } catch (err) {
//       setToast("Failed to create product.");
//     } finally {
//       setLoading(false);
//       setTimeout(() => setToast(""), 4000);
//     }
//   };

//   return (
//     <div>
//       <AdminNav />
//       <div className="max-w-2xl mx-auto p-8">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Product</h1>
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-lg rounded-xl p-6 space-y-6"
//         >
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">Product Name</label>
//             <input
//               name="name"
//               placeholder="Enter product name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3 placeholder-gray-400"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea
//               name="description"
//               placeholder="Enter description"
//               value={form.description}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3 placeholder-gray-400 min-h-[100px]"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">Price</label>
//             <input
//               name="price"
//               placeholder="Enter price"
//               type="number"
//               step="0.01"
//               value={form.price}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3 placeholder-gray-400"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">Priority</label>
//             <select
//               name="priority"
//               value={form.priority}
//               onChange={handleChange}
//               className={`w-full border rounded-lg p-3 ${
//                 form.priority === "" ? "text-gray-400" : "text-gray-800"
//               }`}
//               required
//             >
//               <option value="" disabled>Select Priority</option>
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//               <option value="critical">Critical</option>
//             </select>
//           </div>

//           {/* Submit button for creating a product */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white rounded-lg py-3 mt-2 hover:bg-blue-700 transition"
//           >
//             {loading ? "Creating..." : "Create Product"}
//           </button>
//         </form>

//         {toast && (
//           <div className="mt-6 p-3 bg-green-100 text-green-700 rounded-lg text-center">
//             {toast}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast("");

    try {
      await api.post("/products", form);
      setToast("Product created successfully.");
      setForm({ name: "", description: "", price: "", priority: "low" }); // Reset form
    } catch (error) {
      setToast("Failed to create the product. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 4000);
    }
  };

  const isFormValid = form.name && form.description && form.price;

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
              ➕
            </div>
            <h1
              style={{
                color: "var(--dark-gray)",
                fontSize: "1.75rem",
                margin: "0",
                fontWeight: "700",
              }}
            >
              Create Product
            </h1>
          </div>
          <p
            style={{
              color: "var(--medium-gray)",
              fontSize: "0.9rem",
              margin: "0",
            }}
          >
            Fill in the details below to create a new product
          </p>
        </header>

        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          {/* Create Section */}
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
            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                    color: "var(--dark-gray)",
                    fontSize: "0.9rem",
                  }}
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "0.875rem",
                    fontSize: "0.95rem",
                    borderRadius: "0.5rem",
                    border: "2px solid var(--light-gray)",
                    transition: "all 0.2s ease",
                    backgroundColor: "var(--white)",
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                    color: "var(--dark-gray)",
                    fontSize: "0.9rem",
                  }}
                >
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "0.875rem",
                    fontSize: "0.95rem",
                    borderRadius: "0.5rem",
                    border: "2px solid var(--light-gray)",
                    transition: "all 0.2s ease",
                    backgroundColor: "var(--white)",
                    resize: "none",
                  }}
                  rows="4"
                  required
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                    color: "var(--dark-gray)",
                    fontSize: "0.9rem",
                  }}
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Enter product price"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "0.875rem",
                    fontSize: "0.95rem",
                    borderRadius: "0.5rem",
                    border: "2px solid var(--light-gray)",
                    transition: "all 0.2s ease",
                    backgroundColor: "var(--white)",
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!isFormValid || loading}
                className="btn-primary"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  padding: "0.875rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  backgroundColor: !isFormValid
                    ? "rgba(255, 0, 0, 0.2)"
                    : "var(--primary-red)",
                  color: "var(--white)", // Always white text
                  boxShadow: !isFormValid
                    ? "none"
                    : "0 3px 12px -2px rgba(255, 0, 0, 0.25)",
                  opacity: loading ? "0.6" : "1",
                  cursor: loading || !isFormValid ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </form>
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
    </div>
  );
}