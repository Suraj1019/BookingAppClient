import React from "react";
import CrossIcon from "../Assets/CrossIcon";

const ImagePopup = ({ imgId, setShowImg }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/95"
      onClick={() => setShowImg(false)}
    >
      <div
        className="relative flex h-full w-full items-center justify-centers"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setShowImg(false)}
          className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 text-gray-700 shadow-md transition hover:bg-gray-200"
          aria-label="Close image popup"
        >
          <CrossIcon />
        </button>

        <img
          src={imgId}
          alt="Place"
          className="max-h-[90vh] w-full object-contain"
        />
      </div>
    </div>
  );
};

export default ImagePopup;
