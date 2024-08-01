import React, { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import AccountNav from "../Components/AccountNav";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setUser();
    toast.success("Logged Out");
    navigate("/login");
  };
  return (
    <div>
      <AccountNav />
      <div className="flex items-center flex-col mt-16">
        <p className="font-semibold">
          Logged in as {user.name} ({user.email})
        </p>
        <button className="mt-2 primary max-w-sm" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
