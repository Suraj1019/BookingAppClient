import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Register } from "../Services/apis";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../App";
import Loader from "../Components/Loader";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const register = async (e) => {
    e.preventDefault();
    try {
      setShowLoader(true);
      const response = await Register({
        name: name,
        email: email,
        password: password,
      });
      if (response?.data?.status === 200 || response?.data?.status === 201) {
        setUser(response.data.data);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        toast.success("Registration successfull");
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
          <h1 className="text-4xl text-center mb-4 font-semibold">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={register}>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="primary">Register</button>
            <div className="text-center text-gray-500 py-2">
              Already a member?{" "}
              <Link to={"/login"} className="underline text-black">
                Login
              </Link>
            </div>
          </form>
        </div>
        {showLoader && <Loader />}
      </div>
    </>
  );
};

export default RegisterPage;
