import React from "react";

//components
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
