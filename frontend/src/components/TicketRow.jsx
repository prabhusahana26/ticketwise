import { Link } from "react-router-dom";

const badgeColor = (status) => {
  switch (status) {
    case "closed": return "bg-green-100 text-green-700";
    case "pending_customer":
    case "assigned":
    case "in_progress":
    case "open":
    default: return "bg-yellow-100 text-yellow-700";
  }
};

export default function TicketRow({ t, basePath = "/tickets" }) {
  return (
    <li className="p-3 border rounded flex justify-between items-center">
      <div>
        <div className="font-semibold">{t.title}</div>
        <div className="text-sm text-gray-600">#{t.id} • Priority: {t.priority}</div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`px-2 py-1 rounded text-xs ${badgeColor(t.status)}`}>{t.status}</span>

        <Link to={`${basePath}/${t.id}`} className="text-blue-600">View</Link>
        {/* //         <Link to={`/tickets/${t.id}`} className="text-blue-600">View</Link> */}
      </div>
    </li>
  );
}