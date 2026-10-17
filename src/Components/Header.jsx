import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import StayNestLogo from "../Assets/Logo";
import ProfileIcon from "../Assets/ProfileIcon";

const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <header className=" flex justify-between  items-center ">
      <Link
        to="/"
        className="flex items-center gap-1 text-primary cursor-pointer"
      >
        <StayNestLogo />
      </Link>

      <div
        className={`flex items-center justify-center border border-gray-500 rounded-full px-2 cursor-pointer h-10 ${
          user ? "gap-2" : "gap-0"
        }`}
        onClick={() => {
          navigate(user ? "/account" : "/login");
        }}
      >
        <div className="flex items-center p-1 bg-gray-500 rounded-full text-white">
          <ProfileIcon />
        </div>
        <text className="font-semibold capitalize">
          {user && user?.name?.split(" ")[0]}
        </text>
      </div>
    </header>
  );
};

export default Header;
