import axios from "axios"

const api = axios.create({

baseURL:"https://fruit-vegetable-market-backend.onrender.com/api"
});
// ✅ Attach token to every request
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const IMAGE_URL = "https://fruit-vegetable-market-backend.onrender.com";


export default api
