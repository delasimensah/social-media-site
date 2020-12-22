import React from "react";

const EmptyMessage = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-40 dark:text-gray-200">
      <h1 className="text-lg md:text-xl">{message}</h1>
    </div>
  );
};

export default EmptyMessage;
