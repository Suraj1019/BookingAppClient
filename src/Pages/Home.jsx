import React, { useEffect, useState } from "react";
import { getPlaces } from "../apis";

const Home = () => {
  const [places, setPlaces] = useState([]);

  const GetPlaces = async () => {
    try {
      const resp = await getPlaces();
      setPlaces(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetPlaces();
  }, []);

  return (
    <div className="mt-10 grid gap-x-6 gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place, index) => (
          <div key={index}>
            <div className="bg-gray-500 rounded-2xl flex mb-3">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${place.photos[0]}`}
                alt="place-img"
                className="rounded-2xl aspect-square object-cover"
              />
            </div>
            <h2 className="text-md font-bold truncate">{place.title}</h2>
            <h3 className="text-sm font-semibold">{place.address} </h3>
            <div className="mt-2 font-semibold">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
