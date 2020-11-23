import React, { useEffect, useState } from "react";
import posts from "../../utils/posts";
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { firestore } from "../../firebase/firebaseClient";
import { format } from "timeago.js";

//components
import Layout from "../../components/Layout";
import CreatePostCard from "../../components/CreatePostCard";
import Feed from "../../components/Feed";
import ImageModal from "../../components/ImageModal";
import Suggestions from "../../components/Suggestions";
import Skeleton from "../../components/Skeletons/Skeleton";

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [fetching, setFetching] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const unsubscribe = firestore
      .collection("users")
      .where("username", "==", id)
      .limit(1)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());

        if (data.length === 0) {
          setUserInfo(null);
        }

        setUserInfo(data[0]);
        setFetching(false);
      });

    return () => {
      unsubscribe();
    };
  }, [id]);

  if (!fetching && !userInfo) {
    return <div>No user found</div>;
  }

  return (
    <Layout>
      <div className="container">
        <div className="relative">
          <div className="h-40 overflow-hidden rounded-md md:h-60">
            <Skeleton isLoaded={!fetching} className="h-40 md:h-60">
              <img
                src={userInfo?.coverPhoto}
                alt=""
                className="object-center w-full"
              />
            </Skeleton>
          </div>

          <div className="absolute w-22 h-22 overflow-hidden border-4 border-[#f4f4f4] dark:border-darklight rounded-full -bottom-10 md:w-32 md:h-32 lg:-bottom-14 lg:left-10 left-5">
            <Skeleton isLoaded={!fetching} className="w-40 h-40 ">
              <img
                src={userInfo?.profileImage}
                alt=""
                className="w-full h-full"
              />
            </Skeleton>
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
              <Skeleton isLoaded={!fetching} className="w-40 h-4">
                <h1 className="capitalize dark:text-white md:text-lg ">
                  {userInfo?.username}
                </h1>
              </Skeleton>

              <Skeleton isLoaded={!fetching} className="h-4 w-72">
                <p className="text-sm text-color">{userInfo?.bio}</p>
              </Skeleton>

              <Skeleton isLoaded={!fetching} className="h-4 w-60">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <IoLocationOutline className="text-color" />
                    <p className="text-sm dark:text-white">
                      {userInfo?.location}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <IoCalendarOutline className="text-color" />
                    <p className="text-sm dark:text-white">
                      Joined {format(userInfo?.createdAt)}
                    </p>
                  </div>
                </div>
              </Skeleton>
            </div>

            <Skeleton isLoaded={!fetching} className="h-4 w-60">
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
            </Skeleton>
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
