import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    console.log("Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });
    config.headers.Authorization = `Bearer ${process.env.EXPO_PUBLIC_TOKEN}`;
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export default api;
