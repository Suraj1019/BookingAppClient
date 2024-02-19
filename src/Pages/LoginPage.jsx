import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Login } from "../apiCalls";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await Login(email, password);
      console.log(response);
      alert("Login Sucessfull");
      navigate("/");
    } catch (error) {
      alert("Login Failed");
    }
  };
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-12">
        <h1 className="text-4xl text-center mb-4 font-semibold">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={login}>
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
          <button className="primary">Login</button>
          <div className="text-center text-gray-500 py-2">
            Don't have an account yet?{" "}
            <Link to={"/register"} className="underline text-black">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
