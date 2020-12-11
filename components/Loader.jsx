import React from "react";

//components
import Logo from "./Logo";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-dark">
      <h1 className="text-8xl">Loading....</h1>
      {/* <div className="w-24">
        <Logo />
      </div> */}
    </div>
  );
};

export default Loader;
