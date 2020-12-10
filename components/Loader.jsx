import React from "react";

//components
import Logo from "./Logo";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-dark">
      <Logo className="text-white" />
    </div>
  );
};

export default Loader;
