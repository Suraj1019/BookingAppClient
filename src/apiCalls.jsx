import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;

export const Register = async (name, email, password) => {
  try {
    const response = await axios.post(`/user/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const Login = async (email, password) => {
  try {
    const response = await axios.post(`/user/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
