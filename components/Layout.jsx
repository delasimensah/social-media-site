import React from "react";

//components
import Navbar from "./Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="page-default bg-[#f4f4f4] dark:bg-darklight overflow-hidden">
      <Navbar />

      {children}
    </div>
  );
};

export default Layout;
