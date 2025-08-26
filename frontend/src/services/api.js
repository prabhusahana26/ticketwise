import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 10000,
});
// Attach token automatically
// api.interceptors.request.use((config) => {
//   const storedAdmin = localStorage.getItem("admin");
//   if (storedAdmin) {
//     const token = JSON.parse(storedAdmin).token;
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Simple interceptor (optional)
api.interceptors.response.use(
  (r) => r,
  (e) => {
    console.error("API error:", e?.response || e);
    return Promise.reject(e);
  }
);

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("adminToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });


