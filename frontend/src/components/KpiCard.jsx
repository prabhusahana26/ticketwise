export default function KpiCard({ title, value, color = "bg-gray-800" }) {
    return (
      <div className={`p-4 rounded text-white ${color}`}>
        <div className="text-sm opacity-80">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    );
  }
  