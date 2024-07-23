import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import { UserContext } from "../App";
import { getPlacesByUserId } from "../apis";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const { user } = useContext(UserContext);

  const GetPlaces = async () => {
    try {
      const resp = await getPlacesByUserId(user.userId);
      setPlaces(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetPlaces();
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          to={"/account/places/new"}
          className="bg-primary px-6 py-2 rounded-full inline-flex text-white gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Add New Place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => {
            return (
              <Link
                to={"/account/places/" + place._id}
                key={place._id}
                className="flex gap-4 bg-gray-100 p-4 rounded-2xl cursor-pointer"
              >
                <div className="flex w-32 h-32 bg-gray-300 shrink-0 grow rounded-md">
                  {place.photos.length > 0 && (
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${place.photos[0]}`}
                      alt="place-img"
                      className="object-cover rounded-md"
                    />
                  )}
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-2xl font-semibold">{place.title}</h2>
                  <p className="text-sm mt-2 font-semibold">
                    {place.description}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default PlacesPage;
