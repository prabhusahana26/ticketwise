    // src/pages/admin/Products.jsx
    import AdminNav from "../../../components/admin/AdminNav";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const options = [
    { key:'create', title: "Create Product", desc: "Add a new product entry", path: "/admin/products/create", tag: "Create" },
    { key:'list', title: "View Products", desc: "Browse the product catalogue", path: "/admin/products/view", tag: "Browse" },
    { key:'view-one', title: "View Product by ID", desc: "Lookup a single product record", path: "/admin/products/view/:id", tag: "Lookup" },
    { key:'update', title: "Update Product by ID", desc: "Modify product details precisely", path: "/admin/products/update/:id", tag: "Update" },
    { key:'delete', title: "Delete Product by ID", desc: "Remove a product record safely", path: "/admin/products/delete/:id", tag: "Delete" },
  ];

  return (
    <div>
      <AdminNav />
      <div className="page-wrapper">
        <div className="stack-md" style={{textAlign:'center'}}>
          <h1 className="page-title">Manage Products</h1>
          <p className="subtitle">Catalogue maintenance and individual product operations.</p>
        </div>
        <div className="manage-grid mt-8">
          {options.map(o => (
            <div key={o.key} className="manage-card" onClick={()=> navigate(o.path)} role="button" tabIndex={0} onKeyDown={(e)=> e.key==='Enter' && navigate(o.path)}>
              <div className="manage-icon" aria-hidden>{o.tag.slice(0,2).toUpperCase()}</div>
              <h3>{o.title}</h3>
              <p>{o.desc}</p>
              <div className="manage-meta"><span>{o.tag}</span><span className="tag">GO</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
