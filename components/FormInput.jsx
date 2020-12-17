import React from "react";

const FormInput = ({ name, type, placeholder, onChange, value, icon, val }) => {
  return (
    <div className="flex items-center px-2 py-2 focus-within:bg-white focus-within:shadow-md transition-shadow duration-500 ease-in-out space-x-3 bg-[#f7f7f7] dark:bg-darklight rounded-full">
      {icon}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="text-sm text-gray-800 bg-transparent caret-gray-700 dark:text-gray-300 focus:outline-none w-60 dark:caret-gray-300"
        ref={val}
      />
    </div>
  );
};

export default FormInput;
