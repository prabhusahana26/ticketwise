// // src/pages/admin/ViewAgents.jsx
// import { useEffect, useState } from "react";
// import AdminNav from "../../components/AdminNav";
// import { api } from "../../services/api";

// export default function ViewAgents() {
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch all agents on component mount
//   useEffect(() => {
//     const fetchAgents = async () => {
//       setLoading(true);
//       try {
//         const res = await api.get("/agents/");
//         setAgents(res.data); // assumes the API returns an array of agents
//       } catch (err) {
//         setError("Failed to fetch agents");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAgents();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
//       <AdminNav />
//       <div className="p-8 max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">
//           View All Agents
//         </h1>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading agents...</p>
//         ) : error ? (
//           <p className="text-center text-red-600 font-semibold">{error}</p>
//         ) : agents.length === 0 ? (
//           <p className="text-center text-gray-500 font-medium">No agents found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
//               <thead className="bg-indigo-100 text-left">
//                 <tr>
//                   <th className="p-4 font-semibold">#</th>
//                   <th className="p-4 font-semibold">Name</th>
//                   <th className="p-4 font-semibold">Email</th>
//                   <th className="p-4 font-semibold">Phone</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {agents.map((agent, idx) => (
//                   <tr
//                     key={agent.id || idx}
//                     className="border-b hover:bg-indigo-50 transition cursor-pointer transform hover:scale-101"
//                   >
//                     <td className="p-4">{idx + 1}</td>
//                     <td className="p-4">{agent.name}</td>
//                     <td className="p-4">{agent.email}</td>
//                     <td className="p-4">{agent.phone || "-"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// src/pages/admin/ViewAgents.jsx
import { useEffect, useState } from "react";
import AdminNav from "../../../components/admin/AdminNav";
import { api } from "../../../services/api";

export default function ViewAgents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/agents/")
      .then((res) => setAgents(res.data))
      .catch(() => setAgents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <AdminNav />
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">
          All Agents
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading agents...</p>
        ) : agents.length === 0 ? (
          <p className="text-center text-gray-600">No agents found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform duration-200"
              >
                <h2 className="text-xl font-semibold mb-2">
                  <span>Name: </span>{agent.name}
                </h2>
                <p>Email: {agent.email}</p>
                <p>Phone: {agent.phone || "N/A"}</p>
                <p className="text-gray-500 text-sm">ID: {agent.id}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
