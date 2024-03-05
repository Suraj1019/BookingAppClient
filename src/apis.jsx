import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;

export const Register = async (name, email, password) => {
  return await axios.post(`/user/register`, {
    name,
    email,
    password,
  });

};

export const Login = async (email, password) => {
  return await axios.post(`/user/login`, {
    email,
    password,
  });
};

export const uploadImageByLink = async (link) => {
  return await axios.post(`/upload/uploadByLink`, {
    link: link
  });
};
