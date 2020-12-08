import React from "react";
import { format } from "timeago.js";
import { withAuthUser, useAuthUser } from "next-firebase-auth";
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";

const ProfileInfo = ({ userInfo }) => {
  const AuthUser = useAuthUser();

  return (
    <div>
      <div className="relative">
        <div className="h-40 overflow-hidden bg-gray-400 rounded-md md:h-60">
          <img src={userInfo?.coverPhoto} alt="" className="w-full h-full" />
        </div>

        <div className="absolute w-24 h-24 overflow-hidden border-4 border-[#f4f4f4] dark:border-darklight rounded-full -bottom-10 md:w-32 md:h-32 lg:-bottom-14 lg:left-10 left-5 bg-gray-400">
          <img src={userInfo?.profileImage} alt="" className="w-full h-full" />
        </div>
      </div>

      {AuthUser.id ? (
        <div className="flex justify-end pt-5">
          <button className="px-3 py-1 text-purple-600 border-2 border-purple-600 rounded-full md:px-5 md:py-2">
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="flex justify-end h-10 mt-5 md:h-14"></div>
      )}

      <div className="grid gap-5 px-5 pb-10 md:grid-cols-2">
        <div className="space-y-3">
          <h1 className="dark:text-white md:text-lg ">{userInfo?.username}</h1>

          <p className="text-sm text-color">{userInfo?.bio}</p>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <IoLocationOutline className="text-color" />
              <p className="text-sm dark:text-white">{userInfo?.location}</p>
            </div>

            <div className="flex items-center space-x-2">
              <IoCalendarOutline className="text-color" />
              <p className="text-sm dark:text-white">
                Joined {format(userInfo?.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-5 md:justify-center">
          {/* <div className="text-center">
                <p className="text-lg dark:text-white">Posts</p>
                <p className="text-color">10</p>
              </div> */}

          <div className="flex space-x-2">
            <p className="text-color">{userInfo?.followers.length}</p>
            <p className=" dark:text-white">Followers</p>
          </div>

          <div className="flex space-x-2">
            <p className="text-color">{userInfo?.following.length}</p>
            <p className="dark:text-white">Following</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthUser()(ProfileInfo);
