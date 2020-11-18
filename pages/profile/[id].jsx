import React, { useEffect, useState } from "react";
import posts from "../../utils/posts";
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { firestore } from "../../firebase/firebaseClient";
import { format } from "timeago.js";

//chakra-ui
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

//components
import Layout from "../../components/Layout";
import CreatePostCard from "../../components/CreatePostCard";
import Feed from "../../components/Feed";

import Suggestions from "../../components/Suggestions";

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [fetching, setFetching] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    setFetching(true);

    const unsubscribe = firestore
      .collection("users")
      .where("username", "==", id)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());

        if (data.length === 0) {
          setUserInfo({});
        }

        setUserInfo(data[0]);
        setFetching(false);
      });

    return () => {
      unsubscribe();
    };
  }, [id]);

  return (
    <Layout>
      <div className="container">
        <div className="relative">
          <Skeleton isLoaded={!fetching}>
            <div className="h-40 overflow-hidden rounded-md md:h-60">
              <img
                src={userInfo?.coverPhoto}
                alt=""
                className="w-full h-full"
              />
            </div>
          </Skeleton>

          <div className="absolute w-24 h-24 overflow-hidden border-4 border-[#f4f4f4] dark:border-darklight bg-white rounded-full -bottom-10 md:w-32 md:h-32 lg:-bottom-14 lg:left-10 left-5">
            <SkeletonCircle size="" isLoaded={!fetching}>
              <img
                src={userInfo?.profileImage}
                alt=""
                className="w-full h-full"
              />
            </SkeletonCircle>
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
              <SkeletonText isLoaded={!fetching} noOfLines={1} width="100px">
                <h1 className="capitalize dark:text-white md:text-lg">
                  {userInfo?.username}
                </h1>
              </SkeletonText>

              <SkeletonText isLoaded={!fetching}>
                <p className="text-sm text-color">{userInfo?.bio}</p>
              </SkeletonText>

              <SkeletonText isLoaded={!fetching} noOfLines={1}>
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
              </SkeletonText>
            </div>

            <div className="flex items-center space-x-5 md:justify-center">
              {/* <div className="text-center">
                <p className="text-lg dark:text-white">Posts</p>
                <SkeletonText>
                  <p className="text-color">10</p>
                </SkeletonText>
                
              </div> */}

              <div className="text-center">
                <p className=" dark:text-white">Followers</p>
                <SkeletonText isLoaded={!fetching} width="50px" noOfLines={1}>
                  <p className="text-color">{userInfo?.followers.length}</p>
                </SkeletonText>
              </div>

              <div className="text-center">
                <p className="dark:text-white">Following</p>
                <SkeletonText isLoaded={!fetching} width="50px" noOfLines={1}>
                  <p className="text-color">{userInfo?.following.length}</p>
                </SkeletonText>
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
    </Layout>
  );
};

export default ProfilePage;
