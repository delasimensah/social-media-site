import React from "react";

const Stories = () => {
  return (
    <div className="bg-white dark:bg-[#202836] rounded-md shadow-md ">
      <div className="flex p-5 space-x-5 overflow-x-scroll">
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
      </div>
    </div>
  );
};

const Story = () => {
  return (
    <div className="w-10 h-10 md:w-12 md:h-12">
      <img
        src="/me.jpg"
        alt="profile picture"
        className="w-full h-full border-2 border-purple-600 rounded-full"
      />
    </div>
  );
};

export default Stories;
