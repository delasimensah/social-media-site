import React from "react";
import Image from "next/image";
import {
  IoImagesOutline,
  IoLocationOutline,
  IoPersonOutline,
} from "react-icons/io5";

const CreatePostCard = () => {
  return (
    <div className="bg-white dark:bg-[#202836]  divide-y dark:divide-gray-700 rounded-md shadow-md focus-within:shadow-lg transition-shadow duration-500 ease-in-out">
      <div className="flex px-3 py-5 space-x-5">
        <div className="w-10 h-10 md:w-12 md:h-14">
          <Image
            src="/me.jpg"
            alt="profile picture"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>

        <div className="flex-grow">
          <textarea
            name=""
            maxLength="280"
            placeholder="Write something here"
            className="text-[15px] md:text-base focus:outline-none w-full resize-none dark:bg-[#202836] dark:caret-gray-200 dark:text-gray-200"
          ></textarea>
        </div>

        {/* <input
          type="text"
          name=""
          placeholder="Write something here"
          className="text-sm focus:outline-none dark:bg-[#202836] dark:caret-gray-200"
        /> */}
      </div>

      <div className="flex items-center px-3 py-2 space-x-3 md:space-x-5">
        <div className="flex items-center p-2 space-x-2 text-gray-400 rounded-full cursor-pointer bg-gray-400/20 hover:bg-purple-600/20">
          <IoImagesOutline className="w-5 h-5" />
        </div>

        <div className="flex items-center p-2 space-x-2 text-gray-400 rounded-full cursor-pointer bg-gray-400/20 hover:bg-purple-600/20">
          <IoLocationOutline className="w-5 h-5" />
        </div>

        <div className="flex items-center p-2 space-x-2 text-gray-400 rounded-full cursor-pointer bg-gray-400/20 hover:bg-purple-600/20">
          <IoPersonOutline className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default CreatePostCard;
