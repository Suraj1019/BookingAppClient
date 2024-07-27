import React, { useContext, useEffect, useState } from "react";
import AccountNav from "../Components/AccountNav";
import { UserContext } from "../App";
import { getBookings } from "../apis";
import { Link } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(UserContext);

  const getNights = (checkIn, checkOut) => {
    const day = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return day / (1000 * 60 * 60 * 24);
  };

  useEffect(() => {
    const GetPlaces = async () => {
      try {
        const resp = await getBookings(user?.userId);
        setBookings(resp.data);
        // console.log(bookings, "bookings");
      } catch (error) {
        console.log(error);
      }
    };
    user.userId && GetPlaces();
  }, [user.userId]);

  return (
    <div>
      <AccountNav />
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
                      src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${booking.photos[0]}`}
                      alt="place-img"
                      className="object-cover rounded-md"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-semibold">{booking.title}</h2>
                  <div className="text-gray-500 flex text-md font-semibold gap-1">
                    <div className="flex gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                        />
                      </svg>
                      {getNights(booking.checkIn, booking.checkOut)} nights |
                    </div>
                    <div className="flex gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                      <p>
                        {new Date(booking.checkIn).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    &rarr;
                    <div className="flex gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                      <p>
                        {new Date(booking.checkOut).toLocaleDateString(
                          "en-GB",
                          { day: "2-digit", month: "2-digit", year: "numeric" }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                      />
                    </svg>
                    <p className="text-xl font-semibold">
                      Total Price: ${booking.price}{" "}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Bookings;
