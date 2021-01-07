import React, { useState, useEffect } from "react";
import { format } from "timeago.js";
import { withAuthUser, useAuthUser } from "next-firebase-auth";
import {
  IoLocationOutline,
  IoCalendarOutline,
  IoCameraOutline,
  IoCogOutline,
} from "react-icons/io5";
import { firestore, storage, follow } from "../firebase/firebaseClient";

//components
import EditProfileButton from "./EditProfileButton";
import FriendsList from "./FriendsList";

const ProfileInfo = ({ userInfo, posts }) => {
  const AuthUser = useAuthUser();
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (!AuthUser.id) {
      return;
    }
    const unsubscribe = firestore
      .doc(`users/${AuthUser.id}`)
      .onSnapshot((docSnapshot) => {
        const user = {
          id: docSnapshot.id,
          following: docSnapshot.data().following,
        };

        if (user.following.includes(userInfo.id)) {
          return setFollowing(true);
        }

        setFollowing(false);
      });

    return () => unsubscribe();
  }, [AuthUser.id, userInfo]);

  const updateCoverImage = async (e) => {
    const file = e.target.files[0];
    setLoading(true);

    const extension = file.name.split(".").pop();
    const name = `cover-image.${extension}`;

    try {
      const ref = storage.ref(`${AuthUser.id}/${name}`);

      const snapshot = await ref.put(file);

      const url = await snapshot.ref.getDownloadURL();

      await firestore.doc(`users/${AuthUser.id}`).update({
        coverPhoto: url,
      });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const updateProfileImage = async (e) => {
    const file = e.target.files[0];

    setLoadingProfile(true);

    const extension = file.name.split(".").pop();
    const name = `profile-image.${extension}`;

    try {
      const ref = storage.ref(`${AuthUser.id}/${name}`);

      const snapshot = await ref.put(file);

      const url = await snapshot.ref.getDownloadURL();

      await AuthUser.firebaseUser.updateProfile({
        photoURL: url,
      });

      await firestore.doc(`users/${AuthUser.id}`).update({
        profileImage: url,
      });

      setLoadingProfile(false);
    } catch (error) {
      console.log(error.message);
      setLoadingProfile(false);
    }
  };

  const followUser = (id) => {
    return follow(AuthUser.id, id);
  };

  return (
    <div>
      <div className="relative">
        <div className="relative h-40 overflow-hidden bg-gray-400 rounded-md md:h-60">
          <img
            src={userInfo?.coverPhoto}
            alt=""
            className="object-cover object-top w-full h-full"
          />

          {AuthUser.id === userInfo.id && (
            <label
              htmlFor="cover"
              className="absolute flex items-center p-2 text-gray-100 bg-gray-700 rounded-full cursor-pointer top-5 right-5 hover:bg-purple-600"
            >
              {loading ? (
                <IoCogOutline className="w-5 h-5 animate-spin" />
              ) : (
                <IoCameraOutline className="w-5 h-5" />
              )}
              <input
                type="file"
                id="cover"
                accept=".png,.jpeg,.jpg,.gif"
                className="hidden"
                onChange={updateCoverImage}
              />
            </label>
          )}
        </div>

        <div className="absolute w-24 h-24 bg-transparent md:w-32 md:h-32 -bottom-10 lg:left-10 left-5 lg:-bottom-14 ">
          <div className="relative w-full h-full border-4 border-[#f4f4f4] dark:border-darklight rounded-full   bg-gray-400">
            <img
              src={userInfo?.profileImage}
              alt=""
              className="object-cover w-full h-full rounded-full"
            />

            {AuthUser.id === userInfo.id && (
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex items-center p-2 text-gray-100 bg-gray-700 rounded-full cursor-pointer hover:bg-purple-600"
              >
                {loadingProfile ? (
                  <IoCogOutline className="w-5 h-5 animate-spin" />
                ) : (
                  <IoCameraOutline className="w-5 h-5" />
                )}
                <input
                  type="file"
                  id="profile"
                  accept=".png,.jpeg,.jpg"
                  className="hidden"
                  onChange={updateProfileImage}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      {AuthUser.id ? (
        <div className="flex justify-end px-4 pt-5">
          {AuthUser.id === userInfo.id ? (
            <EditProfileButton userInfo={userInfo} />
          ) : (
            <button
              className="px-3 py-1 text-purple-600 border-2 border-purple-600 rounded-full md:px-5 md:py-2"
              onClick={() => followUser(userInfo.id)}
            >
              {following ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      ) : (
        <div className="flex justify-end h-10 mt-5 md:h-14"></div>
      )}

      <div className="grid gap-5 px-5 pb-10 md:grid-cols-2">
        <div className="space-y-3">
          <h1 className="dark:text-white md:text-lg ">@{userInfo?.username}</h1>

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
          <div className="flex space-x-2">
            <p className="text-color">{posts.length}</p>
            <p className=" dark:text-white">Posts</p>
          </div>

          <FriendsList friends={userInfo?.followers} name="Followers" />

          <FriendsList friends={userInfo?.following} name="Following" />
        </div>
      </div>
    </div>
  );
};

export default withAuthUser()(ProfileInfo);
