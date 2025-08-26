import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import CustomerNav from "../../components/customer/CustomerNav";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <CustomerNav />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <ul className="grid gap-4">
          {products.map((p) => (
            <li key={p.id} className="p-4 border rounded hover:bg-gray-50">
              <Link to={`/products/${p.id}`}>
                <h2 className="font-semibold">{p.name}</h2>
                <p className="text-sm text-gray-600">{p.description}</p>
                <div className="text-xs text-gray-500 mt-1">Priority: {p.priority} • ₹{p.price}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
