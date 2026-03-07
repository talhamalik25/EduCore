import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

// attach token to every request automatically
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("educore_user");
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// redirect to login on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("educore_user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;