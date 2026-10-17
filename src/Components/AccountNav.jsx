import React from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileIconNew from "../Assets/ProfileIconNew";
import BookingIcon from "../Assets/BookingIcon";
import AccomodationIcon from "../Assets/AccomodationIcon";

const AccountNav = () => {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }

  return (
    <nav className="w-full flex justify-center mt-10 gap-2 mb-8">
      <Link
        to={"/account"}
        className={
          subpage === "profile"
            ? "bg-primary text-white rounded-full py-2 px-6 font-semibold flex gap-2"
            : "bg-gray-200 rounded-full py-2 px-6 font-semibold flex gap-2"
        }
      >
        <ProfileIconNew />
        <span>My Profile</span>
      </Link>
      <Link
        to={"/account/bookings"}
        className={
          subpage === "bookings"
            ? "bg-primary text-white rounded-full py-2 px-6 font-semibold flex gap-2"
            : "bg-gray-200 rounded-full py-2 px-6 font-semibold flex gap-2"
        }
      >
        <BookingIcon />
        <span>My Bookings</span>
      </Link>
      <Link
        to={"/account/places"}
        className={
          subpage === "places"
            ? "bg-primary text-white rounded-full py-2 px-6 font-semibold flex gap-2"
            : "bg-gray-200 rounded-full py-2 px-6 font-semibold flex gap-2"
        }
      >
        <AccomodationIcon />
        <span>My Accomodations</span>
      </Link>
    </nav>
  );
};

export default AccountNav;
