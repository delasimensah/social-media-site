import React from "react";

const OtherLinks = () => {
  return (
    <div
      className={`flex flex-col text-black border bg-white rounded-md shadow-md w-40`}
    >
      <a href="/">Profile</a>
      <button>Sign Out</button>
    </div>
  );
};

export default OtherLinks;
