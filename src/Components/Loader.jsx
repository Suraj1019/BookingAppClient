import React from "react";

const Loader = () => {
  return (
    <div className="bottom-0  fixed z-10 top-0 left-0 right-0 bg-[#808080BF] flex justify-center items-center">
      <div className="h-20 w-20 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
