import React from "react";

const Skeleton = ({ children, isLoaded, className }) => {
  return (
    <div
      className={`${
        !isLoaded && `rounded bg-gray-400 animate-pulse ${className}`
      } `}
    >
      {isLoaded && children}
    </div>
  );
};

export default Skeleton;
