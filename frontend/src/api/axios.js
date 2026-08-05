import axios from "axios";

const API = axios.create({
  baseURL: "https://timex-backend-dtwn.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const stored = localStorage.getItem("timexUser");

  if (stored) {
    const { token } = JSON.parse(stored);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default API;