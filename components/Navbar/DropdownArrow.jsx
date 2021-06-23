import React from "react";

const DropdownArrow = ({ className }) => {
  return (
    <div
      className={`relative ${className} w-0 h-0 border-t-0 border-l-[9px] border-r-[9px] border-b-[9px] border-solid border-l-transparent border-r-transparent border-b-white dark:border-b-[#171c26]`}
    />
  );
};

export default DropdownArrow;
