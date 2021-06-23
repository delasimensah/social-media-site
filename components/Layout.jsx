import React from "react";

//components
import Navbar from "./Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
