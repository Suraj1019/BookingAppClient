// import axiosInstance from "axiosInstance";
// axiosInstance.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
// axiosInstance.defaults.withCredentials = true;
import axiosInstance from "./interceptor";

export const Register = (data) => {
  return axiosInstance.post(`/user/register`, data);
};

export const Login = (data) => {
  return axiosInstance.post(`/user/login`, data);
};

export const uploadImageByLink = (link) => {
  return axiosInstance.post(`/upload/uploadByLink`, {
    link: link,
  });
};

export const uploadImage = (data) => {
  return axiosInstance.post("/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addPlace = (data) => {
  return axiosInstance.post("/places/addPlace", data);
};

export const updatePlace = (data) => {
  return axiosInstance.post("/places/update", data);
};

export const getPlacesByUserId = (userId) => {
  return axiosInstance.get(`/places/getPlaces?userId=${userId}`);
};

export const getPlaces = () => {
  return axiosInstance.get(`/places`);
};

export const getPlace = (id) => {
  return axiosInstance.get(`/places/getPlace?id=${id}`);
};

export const bookPlace = (data) => {
  return axiosInstance.post(`/bookings/bookPlace`, data);
};

export const getBookings = (userId) => {
  return axiosInstance.get(`/bookings/getBookings?userId=${userId}`);
};

export const getBookingDetails = (bookingId) => {
  return axiosInstance.get(
    `/bookings/getBookingDetails?bookingId=${bookingId}`
  );
};
