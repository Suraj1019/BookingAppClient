import React, { useState } from "react";
import CrossIcon from "../Assets/CrossIcon";
import Loader from "./Loader";
import ImagePopup from "./ImgagePopup";

const PhotoGallery = ({ place, setShowAllPhotos, showLoader }) => {
  const [showImg, setShowImg] = useState(false);
  const [imgId, setImgId] = useState("");

  const onImgClick = (imgId) => {
    setImgId(imgId);
    setShowImg(true);
  };
  return (
    <div className=" bg-white w-full flex flex-col items-center pt-6 ">
      <div className="flex justify-between w-full py-4">
        <h3 className="text-3xl font-semibold">{place.title}</h3>
        <button
          className="flex items-center gap-1 rounded-full bg-gray-200 p-2 text-gray-700 shadow-md transition hover:bg-gray-500"
          onClick={() => {
            setShowAllPhotos(false);
          }}
        >
          <CrossIcon />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2 w-full">
        {place?.photos?.map((photo, index) => (
          <div
            key={index}
            className="w-full h-[35vh] cursor-pointer"
            onClick={() => onImgClick(photo)}
          >
            <img
              src={photo}
              alt={`Place ${index + 1}`}
              className="object-cover h-full w-full rounded-lg"
            />
          </div>
        ))}
      </div>
      {showLoader && <Loader />}
      {showImg && imgId && <ImagePopup imgId={imgId} setShowImg={setShowImg} />}
    </div>
  );
};

export default PhotoGallery;
