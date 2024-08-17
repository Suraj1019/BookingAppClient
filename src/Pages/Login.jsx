import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Login } from "../Services/apis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../App";
import Loader from "../Components/Loader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();
    try {
      setShowLoader(false);
      const response = await Login({ email: email, password: password });
      if (response?.data?.status === 200 || response?.data?.status === 201) {
        toast.success("Login Successfull");
        setUser(response.data.data);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        navigate("/");
      } else {
        throw new Error(
          response.message || response?.data?.message || "Something went wrong"
        );
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowLoader(false);
    }
  };
  return (
    <>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-12">
          <h1 className="text-4xl text-center mb-4 font-semibold">Login</h1>
          <form className="max-w-md mx-auto" onSubmit={login}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button className="primary">Login</button>
            <div className="text-center text-gray-500 py-2">
              Don't have an account yet?{" "}
              <Link to={"/register"} className="underline text-black">
                Register now
              </Link>
            </div>
          </form>
        </div>
        {showLoader && <Loader />}
      </div>
    </>
  );
};

export default LoginPage;
