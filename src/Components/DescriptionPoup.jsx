import React from "react";
import CrossIcon from "../Assets/CrossIcon";

const DescriptionPopup = ({ text, setShowPopup }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/95"
      onClick={() => setShowPopup(false)}
    >
      <div
        className="relative flex h-full w-full  items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setShowPopup(false)}
          className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 text-gray-700 shadow-md transition hover:bg-gray-200"
          aria-label="Close image popup"
        >
          <CrossIcon />
        </button>
        <div className="max-w-[80vw]">
          <h3 className="text-2xl font-semibold">Description</h3>
          <div className="my-2 font-semibold">
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionPopup;
