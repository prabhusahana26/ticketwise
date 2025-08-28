// // src/pages/admin/CreateProduct.jsx
// import { useState } from "react";
// import { api } from "../../../services/api";
// import AdminNav from "../../../components/admin/AdminNav";

// export default function CreateProduct() {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     priority: "low",
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
//   setToast("Product created successfully.");
//       setForm({ name: "", description: "", price: "", priority: "low" });
//     } catch (err) {
//   setToast("Failed to create product.");
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
//           className="bg-white shadow-lg rounded-xl p-6 space-y-4"
//         >
//           <input
//             name="name"
//             placeholder="Product Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3"
//             required
//           />
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={form.description}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3"
//           />
//           <input
//             name="price"
//             placeholder="Price"
//             type="number"
//             step="0.01"
//             value={form.price}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3"
//             required
//           />
//           <select
//             name="priority"
//             value={form.priority}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//             <option value="critical">Critical</option>
//           </select>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 transition"
//           >
//             {loading ? "Creating..." : "Create Product"}
//           </button>
//         </form>
//         {toast && (
//           <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
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
    priority: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(""); // Clear previous toast
    
    try {
      const response = await api.post("/products/", {
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

  return (
    <div>
      <AdminNav />
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Product</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 space-y-6"
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              name="name"
              placeholder="Enter product name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 placeholder-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              placeholder="Enter description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 placeholder-gray-400 min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              name="price"
              placeholder="Enter price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 placeholder-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 ${
                form.priority === "" ? "text-gray-400" : "text-gray-800"
              }`}
              required
            >
              <option value="" disabled>Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg py-3 mt-2 hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>

        {toast && (
          <div className="mt-6 p-3 bg-green-100 text-green-700 rounded-lg text-center">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}