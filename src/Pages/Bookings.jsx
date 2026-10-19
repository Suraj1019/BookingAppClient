import React, { useContext, useEffect, useState } from "react";
import AccountNav from "../Components/AccountNav";
import { UserContext } from "../App";
import { getBookings } from "../Services/apis";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";
import MoonIcon from "../Assets/MoonIcon";
import CalenderIcon from "../Assets/CalenderIcon";
import WalletIcon from "../Assets/WalletIcon";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const { user } = useContext(UserContext);

  const getNights = (checkIn, checkOut) => {
    const day = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return day / (1000 * 60 * 60 * 24);
  };

  useEffect(() => {
    const GetPlaces = async () => {
      try {
        setShowLoader(true);
        const resp = await getBookings(user?.userId);
        setBookings(resp.data.data);
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again.",
        );
      }
      setShowLoader(false);
    };
    user.userId && GetPlaces();
  }, [user.userId]);

  return (
    <div>
      <AccountNav />
      {bookings?.length > 0 ? (
        <div className="mt-4 flex flex-col gap-6">
          {bookings.length > 0 &&
            bookings.map((booking) => {
              return (
                <Link
                  to={`/account/bookings/${booking.placeId}/${booking._id}`}
                  key={booking._id}
                  className="flex items-center gap-16 bg-gray-300 p-4 rounded-2xl cursor-pointer"
                >
                  <div className="flex w-32 h-32 bg-gray-300  rounded-md">
                    {booking.photos.length > 0 && (
                      <img
                        src={booking.photos[0]}
                        alt="place-img"
                        className="object-cover rounded-md"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <h2 className="text-2xl font-semibold">{booking.title}</h2>
                    <div className="text-gray-500 flex text-md font-semibold gap-1">
                      <div className="flex gap-1">
                        <MoonIcon />
                        <span>
                          {getNights(booking.checkIn, booking.checkOut)} nights
                          |
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <CalenderIcon />
                        <p>
                          {new Date(booking.checkIn).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>
                      &rarr;
                      <div className="flex gap-1">
                        <CalenderIcon />
                        <p>
                          {new Date(booking.checkOut).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <WalletIcon />
                      <p className="text-xl font-semibold">
                        Total Price: ₹{booking.price}{" "}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      ) : (
        <div className="flex items-center flex-col mt-16">
          <p className="font-semibold">No bookings found.</p>
        </div>
      )}
      {showLoader && <Loader />}
    </div>
  );
};

export default Bookings;
