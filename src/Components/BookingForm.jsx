import React, { useEffect, useState } from "react";

const BookingForm = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const day = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    setDays(day / (1000 * 60 * 60 * 24));
  }, [checkIn, checkOut]);

  return (
    <div className="bg-white px-4 py-3 rounded-xl flex flex-col gap-2">
      <div className="text-center text-2xl font-semibold">
        Price:${place.price}/per night
      </div>
      <div className="border rounded-md border-2">
        <div className="flex justify-between gap-1">
          <div className="border-r-2">
            <div className="p-2">
              <label htmlFor="" className="text-sm font-semibold">
                Check In
              </label>
              <input
                type="date"
                className="rounded-md px-2 text-sm font-semibold border"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="p-2">
              <label htmlFor="" className="text-sm font-semibold">
                Check out
              </label>
              <input
                type="date"
                className="rounded-md px-2 text-sm font-semibold border"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
        </div>
        <div className=" border-t-2">
          <div className="p-2">
            <label htmlFor="" className="text-sm font-semibold">
              Number of Guests
            </label>
            <input
              type="number"
              value={maxGuest}
              onChange={(ev) => setMaxGuest(ev.target.value)}
              className="border "
            />
          </div>
        </div>
      </div>
      <button className="primary font-semibold">
        Book
        {days > 0 && <span>: ${place.price * days}</span>}
      </button>
    </div>
  );
};

export default BookingForm;
