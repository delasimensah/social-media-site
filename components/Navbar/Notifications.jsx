import React from "react";

//components
import DropdownArrow from "./DropdownArrow";

const Notifications = () => {
  return (
    <>
      <DropdownArrow className="left-[180px]" />
      <div className="overflow-hidden rounded-md shadow-lg">
        <div className="relative grid bg-white dark:bg-dark dark:text-white">
          <div className="flex items-center justify-center h-20">
            <p className="capitalize">no notifications</p>
          </div>

          {/* <a
            href="/"
            className="flex items-center p-2 space-x-3 transition duration-150 ease-in-out hover:bg-gray-100"
          >

            <p className="text-sm font-medium text-gray-900">Profile</p>
          </a>

          <a
            href="/"
            className="flex items-center p-2 space-x-3 transition duration-150 ease-in-out hover:bg-gray-100"
          >
            

            <p className="text-sm font-medium text-gray-900">Sign Out</p>
          </a> */}
        </div>
      </div>
    </>
  );
};

export default Notifications;
