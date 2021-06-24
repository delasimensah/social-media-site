import React from "react";

const Indicator = ({ className }) => {
  return (
    <div
      className={`absolute right-0 flex items-center justify-center w-2 h-2 text-sm text-white bg-red-600 rounded-full ${
        className ? className : "top-0"
      }`}
    ></div>
  );
};

export default Indicator;
