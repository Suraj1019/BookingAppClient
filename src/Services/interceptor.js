import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const data = JSON.parse(localStorage.getItem("userData"));
  const token = data?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("userData");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
