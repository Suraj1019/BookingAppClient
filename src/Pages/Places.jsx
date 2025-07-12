import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { getPlacesByUserId } from "../Services/apis";
import AccountNav from "../Components/AccountNav";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const { user } = useContext(UserContext);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const GetPlaces = async () => {
      try {
        setShowLoader(true);
        const resp = await getPlacesByUserId(user.userId);
        if (resp?.data?.status === 200 || resp?.data?.status === 201) {
          setPlaces(resp.data.data);
        } else {
          throw new Error(
            resp.message || resp?.data?.message || "Something went wrong"
          );
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setShowLoader(false);
      }
    };
    user.userId && GetPlaces();
  }, [user.userId]);

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
      <div className="mt-4 flex flex-col gap-6">
        {places.length > 0 &&
          places.map((place) => {
            return (
              <Link
                to={"/account/places/" + place._id}
                key={place._id}
                className="flex items-center gap-4 bg-gray-300 p-4 rounded-2xl cursor-pointer"
              >
                <div className="flex w-32 h-32 bg-gray-300 shrink-0 grow rounded-md">
                  {place.photos.length > 0 && (
                    <img
                      src={place.photos[0]}
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
      {showLoader && <Loader />}
    </div>
  );
};

export default PlacesPage;
