import React from "react";

import { IoSearchOutline } from "react-icons/io5";

const SearchInput = () => {
  return (
    <div className="flex items-center p-2 space-x-3 bg-[#f7f7f7] dark:bg-darklight rounded-full">
      <IoSearchOutline className="w-4 h-4 text-gray-400" />
      <input
        type="search"
        name="search"
        placeholder="search"
        className="text-gray-400 bg-transparent focus:outline-none w-60 dark:caret-gray-400"
      />
    </div>
  );
};

export default SearchInput;
