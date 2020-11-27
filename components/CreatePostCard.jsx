import React from "react";
import {
  IoImagesOutline,
  IoLocationOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { withAuthUser, useAuthUser } from "next-firebase-auth";

const CreatePostCard = () => {
  const AuthUser = useAuthUser();

  return (
    <>
      {AuthUser.id && (
        <div className="bg-white dark:bg-[#202836]  divide-y dark:divide-gray-700 rounded-md shadow-md focus-within:shadow-lg transition-shadow duration-500 ease-in-out">
          <div className="flex px-3 py-5 space-x-5">
            <div className="w-10 h-10 md:w-12 md:h-12">
              <img
                src={AuthUser.photoURL}
                alt="profile picture"
                className="w-full h-full rounded-full bg-black/30"
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
          </div>

          <div className="flex items-center justify-between px-3 py-2 ">
            <div className="flex items-center space-x-3 md:space-x-5">
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

            <button className="w-40 py-[5px] text-sm text-gray-300 uppercase bg-purple-600 rounded-full flex justify-center">
              Post
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default withAuthUser()(CreatePostCard);
