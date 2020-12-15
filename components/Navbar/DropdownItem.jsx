import React from "react";

const DropdownItem = ({ children }) => {
  return (
    <a className="flex items-center p-2 space-x-3 transition duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-darklight">
      {children}
    </a>
  );
};

export default DropdownItem;
