import axios from "axios";
const data = JSON.parse(localStorage.getItem("userData"));

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = data?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.status === 401 || response.data.status === 403) {
      localStorage.removeItem("userData");
      window.location = "/login";
    }
    return response;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
