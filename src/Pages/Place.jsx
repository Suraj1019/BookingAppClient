import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookingDetails, getPlace } from "../Services/apis";
import BookingForm from "../Components/BookingForm";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";
import LocationIcon from "../Assets/LocationIcon";
import ImageIcon from "../Assets/ImageIcon";
import MoonIcon from "../Assets/MoonIcon";
import CalenderIcon from "../Assets/CalenderIcon";
import PhotoGallery from "../Components/PhotoGallery";
import DescriptionPopup from "../Components/DescriptionPoup";

const Place = () => {
  const [place, setPlace] = useState([]);
  const [bookingDetails, setBookingDetails] = useState();
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showPopUp, setShowPopup] = useState(false);
  const { id } = useParams();
  const { bookingId } = useParams();

  const getNights = (checkIn, checkOut) => {
    const day = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return day / (1000 * 60 * 60 * 24);
  };
  const onDescClick = () => {
    setShowPopup(true);
  };
  const formatTime = (time) => {
    if (!time || !/^\d{1,2}:\d{2}$/.test(time)) return time || "";
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
  };

  useEffect(() => {
    if (id) {
      const GetPlace = async () => {
        try {
          setShowLoader(true);
          const resp = await getPlace(id);
          setPlace(resp.data.data);
        } catch (error) {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Something went wrong. Please try again.",
          );
        } finally {
          setShowLoader(false);
        }
      };
      GetPlace();
    }
  }, [id]);

  useEffect(() => {
    if (bookingId) {
      const GetPlace = async () => {
        try {
          setShowLoader(true);
          const resp = await getBookingDetails(bookingId);
          setBookingDetails(resp.data.data);
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
      GetPlace();
    }
  }, [bookingId]);

  if (showAllPhotos) {
    return (
      <PhotoGallery
        place={place}
        setShowAllPhotos={setShowAllPhotos}
        showLoader={showLoader}
      />
    );
  }

  return (
    <div className=" flex flex-col items-center  pt-12 pl-32 pr-32">
      <div className="bg-gray-200 p-6 rounded-2xl">
        <div className="w-full">
          <h1 className="text-3xl font-semibold">{place?.title} </h1>
          {bookingId && bookingDetails && (
            <div className="flex justify-between items-center bg-white rounded-lg py-4 px-8 my-4">
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold">Your Booking info</h2>
                <div className="text-gray-500 flex text-md font-semibold gap-1">
                  <div className="flex gap-1">
                    <MoonIcon />
                    <span>
                      {getNights(
                        bookingDetails?.checkIn,
                        bookingDetails?.checkOut,
                      )}{" "}
                      nights |
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <CalenderIcon />
                    <p>
                      {new Date(bookingDetails.checkIn).toLocaleDateString(
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
                      {new Date(bookingDetails.checkOut).toLocaleDateString(
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
              </div>
              <div className="bg-primary py-2 px-6 rounded-xl text-white  ">
                <p className="text-lg font-semibold text-center">Total Price</p>
                <p className="text-2xl font-semibold text-center">
                  ${bookingDetails.price}{" "}
                </p>
              </div>
            </div>
          )}
          <a
            href={`https://map.google.com/?q=` + place?.address}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 underline block my-2 font-semibold"
          >
            <LocationIcon />
            <span>{place?.address}</span>
          </a>
        </div>

        <div
          className="mt-4 grid gap-2 grid-cols-[2fr_1fr] h-[70vh] w-full rounded-md overflow-hidden relative cursor-pointer"
          onClick={() => setShowAllPhotos(true)}
        >
          <div className="w-full h-full overflow-hidden">
            {place?.photos && place?.photos[0] && (
              <img
                src={place?.photos[0]}
                alt="place-0"
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 w-full h-full">
            {place?.photos && place?.photos[1] && (
              <img
                src={place.photos[1]}
                alt="place-1"
                className="aspect-square object-cover w-full h-full"
              />
            )}
            {place?.photos && place?.photos[2] && (
              <img
                src={place.photos[2]}
                alt="place-2"
                className="aspect-square object-cover w-full h-full"
              />
            )}
            {place?.photos && place?.photos[3] && (
              <img
                src={place.photos[3]}
                alt="place-3"
                className="aspect-square object-cover w-full h-full"
              />
            )}
            {place?.photos && place?.photos[4] && (
              <img
                src={place.photos[4]}
                alt="place-4"
                className="aspect-square object-cover w-full h-full"
              />
            )}
          </div>
          <button
            className="flex items-center gap-1 absolute bottom-2 right-2 bg-white text-sm font-semibold px-4 py-1 rounded-xl shadow-sm shadow-black-100"
            onClick={() => {
              setShowAllPhotos(true);
            }}
          >
            <ImageIcon />
            <span>Show More Photos</span>
          </button>
        </div>

        <div className="flex items-start gap-4 mt-8">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-semibold">Description</h3>
              <div className="my-2 font-semibold">
                {place?.description?.length > 1000 ? (
                  <div>
                    {`${place?.description?.slice(0, 1000)}... `}
                    <button
                      type="button"
                      className="text-primary font-bold"
                      onClick={() => onDescClick()}
                    >
                      more
                    </button>
                  </div>
                ) : (
                  place?.description
                )}
              </div>
            </div>
          </div>
          <BookingForm place={place} />
        </div>
      </div>
      <div className="bg-gray-200 p-6 rounded-2xl mt-3 w-full">
        <h3 className="text-2xl font-semibold">Check in&out times,max guest</h3>
        <div className="flex justify-between mt-2">
          <p className="font-semibold">
            Check In: {formatTime(place?.checkIn)}
          </p>
          <p className="font-semibold">
            Check Out: {formatTime(place?.checkOut)}
          </p>
          <p className="font-semibold">Max Guests: {place?.maxGuests}</p>
        </div>
        <h3 className="text-2xl font-semibold mt-3">Perks</h3>
        <div className="flex justify-between mt-2">
          {place?.perks?.map((perk, index) => (
            <p key={index} className="font-semibold capitalize">
              {perk}
            </p>
          ))}
        </div>
      </div>

      <div className=" pt-6 border-t w-full">
        <h3 className="text-2xl  font-semibold">Extra Info</h3>
        <p className="my-2">{place?.extraInfo}</p>
      </div>
      {showLoader && <Loader />}
      {showPopUp && place?.description && (
        <DescriptionPopup
          text={place?.description}
          setShowPopup={setShowPopup}
        />
      )}
    </div>
  );
};

export default Place;
