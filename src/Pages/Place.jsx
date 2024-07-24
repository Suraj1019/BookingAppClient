import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlace } from "../apis";
import BookingForm from "../Components/BookingForm";

const Place = () => {
  const [place, setPlace] = useState([]);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const GetPlace = async () => {
        try {
          const resp = await getPlace(id);
          setPlace(resp.data);
        } catch (error) {
          console.log(error);
        }
      };
      GetPlace();
    }
  }, [id]);

  if (showAllPhotos) {
    return (
      <div className="absolute bg-white min-h-screen min-w-full flex flex-col items-center py-4">
        <div className="flex justify-between  my-4 w-[70vw] ">
          <h3 className="text-3xl font-semibold">{place.title}</h3>
          <button
            className="flex items-center gap-1 text-black  bg-white  font-semibold px-4 py-1 rounded-xl border border-black fixed right-[13.5rem]"
            onClick={() => {
              setShowAllPhotos(false);
            }}
          >
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            Close Photos
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {place.photos &&
            place.photos.map((photo) => (
              <div className=" w-[70vw]  ">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photo}`}
                  alt=""
                  className="object-cover h-full w-full"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 flex flex-col items-center  ">
      <div className="bg-gray-200 p-6 rounded-2xl">
        <div className="w-[70vw]">
          <h1 className="text-3xl font-semibold">{place.title} </h1>
          <a
            href={`https://map.google.com/?q=` + place.address}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 underline block my-2 font-semibold"
          >
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
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            {place.address}
          </a>
        </div>
        <div
          className="mt-4 grid gap-2 grid-cols-[2fr_1fr] h-[70vh] w-[70vw] rounded-md overflow-hidden relative cursor-pointer"
          onClick={() => setShowAllPhotos(true)}
        >
          <div className="w-full h-full overflow-hidden">
            {place.photos && place?.photos[0] && (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${place.photos[0]}`}
                alt="place-0"
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 w-full h-full">
            {place.photos && place.photos[1] && (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${place.photos[1]}`}
                alt="place-1"
                className="aspect-square object-cover w-full h-full"
              />
            )}
            {place.photos && place.photos[2] && (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${place.photos[2]}`}
                alt="place-2"
                className="aspect-square object-cover w-full h-full"
              />
            )}
            {place.photos && place.photos[3] && (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${place.photos[3]}`}
                alt="place-3"
                className="aspect-square object-cover w-full h-full"
              />
            )}
            {place.photos && place.photos[4] && (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${place.photos[4]}`}
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
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Show More Photos
          </button>
        </div>

        <div className="w-[70vw] gap-4 grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-8">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-2xl font-semibold">Description</h3>
              <p className="my-2 font-semibold">{place.description}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Check In: {place.checkIn} </p>
              <p className="font-semibold">Check Out: {place.checkOut}</p>
              <p className="font-semibold">Max Guests: {place.maxGuests}</p>
            </div>
          </div>
          <BookingForm place={place} />
        </div>
      </div>
      <div className="w-[70vw] pt-6 border-t">
        <h3 className="text-2xl  font-semibold">Extra Info</h3>
        <p className="my-2   ">{place.extraInfo}</p>
      </div>
    </div>
  );
};

export default Place;
