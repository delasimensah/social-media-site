import React from "react";
import { withAuthUser, useAuthUser } from "next-firebase-auth";

const ProfileImg = () => {
  const { photoURL } = useAuthUser();

  return (
    <div className="w-6 h-6 overflow-hidden rounded-full">
      <img
        src={photoURL}
        alt="profile picture"
        width={50}
        height={50}
        className="w-full h-full bg-black/30"
      />
    </div>
  );
};

export default withAuthUser()(ProfileImg);
