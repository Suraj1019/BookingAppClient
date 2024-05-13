import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;

export const Register = (data) => {
  return axios.post(`/user/register`, data);
};

export const Login = (data) => {
  return axios.post(`/user/login`, data);
};

export const uploadImageByLink = (link) => {
  return axios.post(`/upload/uploadByLink`, {
    link: link,
  });
};

export const uploadImage = (data) => {
  return axios.post("/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addPlace = (data) => {
  return axios.post("/places/addPlace", data);
};
