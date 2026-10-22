import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { getPlacesByUserId } from "../Services/apis";
import AccountNav from "../Components/AccountNav";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";
import PlusIcon from "../Assets/PlusIcon";
import EditIcon from "../Assets/EditIcon";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const { user } = useContext(UserContext);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const GetPlaces = async () => {
      try {
        setShowLoader(true);
        const resp = await getPlacesByUserId(user.userId);
        setPlaces(resp.data.data);
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again.",
        );
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
          <PlusIcon />
          <span>Add New Place</span>
        </Link>
      </div>
      {places?.length > 0 ? (
        <div className="mt-4 flex flex-col gap-6">
          {places.length > 0 &&
            places.map((place) => {
              return (
                <Link
                  to={"/place/" + place._id}
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
                    <div className="flex justify-between">
                      <h2 className="text-2xl font-semibold">{place.title}</h2>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(`/account/places/${place._id}`);
                        }}
                        className="shrink-0 cursor-pointer"
                        aria-label={`Edit ${place.title}`}
                      >
                        <EditIcon />
                      </button>
                    </div>
                    <p className="text-sm mt-2 font-semibold">
                      {place.description.length > 1000 ? (
                        <div>
                          {place.description.slice(0, 1000)}...
                          <button
                            type="button"
                            className="text-primary font-bold"
                          >
                            more
                          </button>
                        </div>
                      ) : (
                        place.description
                      )}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      ) : (
        <div className="flex items-center flex-col mt-16">
          <p className="font-semibold">No accomodations found.</p>
        </div>
      )}
      {showLoader && <Loader />}
    </div>
  );
};

export default PlacesPage;
