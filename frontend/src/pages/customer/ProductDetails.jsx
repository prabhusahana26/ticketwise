import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import CustomerNav from "../../components/customer/CustomerNav";

export default function ProductDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const [product, setProduct] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((e) => setErr(e?.response?.data?.detail || "Failed to load"));
  }, [id]);

  if (err) return <div className="p-6 text-red-600">{err}</div>;
  if (!product) return <div className="p-6">Loading…</div>;

  return (
    <div>
      <CustomerNav />
      <div className="p-6 max-w-3xl mx-auto">
        <button className="mb-3 text-blue-600" onClick={() => nav(-1)}>← Back</button>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <div className="text-sm text-gray-500 mt-1">Priority default: {product.priority} • ₹{product.price}</div>

        <button
          className="mt-6 bg-black text-white px-4 py-2 rounded"
          onClick={() => nav(`/tickets/new?productId=${product.id}`)}
        >
          Raise Ticket
        </button>
      </div>
    </div>
  );
}
