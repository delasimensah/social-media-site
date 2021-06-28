import React from "react";
import posts from "../../utils/posts";
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";

//components
import Layout from "../../components/Layout";
import CreatePostCard from "../../components/CreatePostCard";
import Feed from "../../components/Feed";
import ImageModal from "../../components/ImageModal";

import Suggestions from "../../components/Suggestions";

const ProfilePage = () => {
  return (
    <Layout>
      <div className="container">
        <div className="relative">
          <div className="h-40 overflow-hidden rounded-md md:h-60">
            <img src="/cover.jpg" alt="" className="object-center w-full" />
          </div>

          <div className="absolute w-22 h-22 overflow-hidden border-4 border-[#f4f4f4] dark:border-darklight rounded-full -bottom-10 md:w-32 md:h-32 lg:-bottom-14 lg:left-10 left-5">
            <img src="/me.jpg" alt="" className="w-full h-full" />
          </div>
        </div>

        <div className="">
          <div className="flex justify-end pt-5">
            <button className="px-3 py-1 text-purple-600 border-2 border-purple-600 rounded-full md:px-5 md:py-2">
              Edit Profile
            </button>
          </div>

          <div className="grid gap-5 px-5 pb-10 md:grid-cols-2">
            <div className="space-y-3">
              <h1 className="capitalize dark:text-white md:text-lg">
                Delasi Mensah
              </h1>
              <p className="text-sm text-color">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                reiciendis voluptatem perspiciatis provident optio quod
                veritatis facilis tempora molestiae nam?{" "}
              </p>

              <div className="flex items-center space-x-4">
                {/* <div className="flex items-center space-x-2">
                  <IoLocationOutline className="text-color" />
                  <p className="text-sm dark:text-white">Ghana</p>
                </div> */}

                <div className="flex items-center space-x-2">
                  <IoCalendarOutline className="text-color" />
                  <p className="text-sm dark:text-white">Joined May 2020</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-5 md:justify-center">
              <div className="text-center">
                <p className="text-lg dark:text-white">Posts</p>
                <p className="text-color">10</p>
              </div>

              <div className="text-center">
                <p className="text-lg dark:text-white">Followers</p>
                <p className="text-color">10k</p>
              </div>

              <div className="text-center">
                <p className="text-lg dark:text-white">Following</p>
                <p className="text-color">150</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10">
            <div className="space-y-5">
              <CreatePostCard />
              <Feed posts={posts} />
            </div>

            <div className="hidden space-y-10 overflow-hidden lg:block">
              <Suggestions />
            </div>
          </div>
        </div>
      </div>

      <ImageModal />
    </Layout>
  );
};

export default ProfilePage;
