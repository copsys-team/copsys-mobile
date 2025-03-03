import { useAuthStore } from "@/hooks/stores/useAuthStore";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = useAuthStore().tokens?.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers["Content-Type"] = "multipart/form-data";
  config.responseType = "json";

  config;
  return config;
});

export default api;
