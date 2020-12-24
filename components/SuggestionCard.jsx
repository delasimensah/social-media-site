import React, { useEffect, useState } from "react";
import { follow, firestore } from "../firebase/firebaseClient";
import { useRouter } from "next/router";
import Link from "next/link";
import { withAuthUser, useAuthUser } from "next-firebase-auth";

const SuggestionCard = ({ sugg }) => {
  const AuthUser = useAuthUser();
  const [following, setFollowing] = useState(false);
  const router = useRouter();

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

        if (user.following.includes(sugg.id)) {
          return setFollowing(true);
        }

        setFollowing(false);
      });

    return () => unsubscribe();
  }, [AuthUser.id]);

  const followUser = () => {
    if (!AuthUser.id) {
      return router.push("/auth");
    }

    return follow(AuthUser.id, sugg.id);
  };

  return (
    <div
      className={`flex items-center space-x-4 ${
        following ? "hidden" : "block"
      }`}
    >
      <div className="w-10 h-10">
        <img
          src={sugg.profileImage}
          alt=""
          className="object-cover w-full h-full rounded-full bg-black/50"
        />
      </div>

      <Link href={`/profile/${sugg.username}`}>
        <a className="flex-grow text-[14px] text-color">@{sugg.username}</a>
      </Link>

      <button
        className="px-3 py-[5px] text-sm font-light text-white bg-purple-600 rounded-md"
        onClick={followUser}
      >
        Follow
      </button>
    </div>
  );
};

export default withAuthUser()(SuggestionCard);
