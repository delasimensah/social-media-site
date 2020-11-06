import React from "react";
import Image from "next/image";

const ProfileImg = () => {
  return (
    <div className="w-6 h-6 overflow-hidden rounded-full">
      <Image
        src="/me.jpg"
        alt="profile picture"
        width={50}
        height={50}
        className=""
      />
    </div>
  );
};

export default ProfileImg;
