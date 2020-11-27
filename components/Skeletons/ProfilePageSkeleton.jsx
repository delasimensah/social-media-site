import React from "react";

//mui
import Skeleton from "@material-ui/lab/Skeleton";

const ProfilePageSkeleton = () => {
  return (
    <>
      <div className="relative">
        <div className="h-40 overflow-hidden rounded-md md:h-60 bg-[#f4f4f4] dark:bg-darklight">
          <Skeleton variant="rect" width="100%" height="100%"></Skeleton>
        </div>

        <div className="absolute w-24 h-24 overflow-hidden border-4 border-[#f4f4f4] dark:border-darklight rounded-full -bottom-10 md:w-32 md:h-32 lg:-bottom-14 lg:left-10 left-5 bg-[#f4f4f4] dark:bg-darklight">
          <Skeleton variant="circle" width="100%" height="100%"></Skeleton>
        </div>
      </div>

      <div className="flex justify-end h-10 mt-5 md:h-14"></div>

      <div className="grid gap-5 px-5 pb-10 md:grid-cols-2">
        <div className="space-y-3">
          <Skeleton variant="text" width="40%"></Skeleton>

          <div>
            <Skeleton variant="text" width="70%"></Skeleton>

            <Skeleton variant="text" width="60%"></Skeleton>

            <Skeleton variant="text" width="50%"></Skeleton>
          </div>

          <div className="flex items-center space-x-4">
            <Skeleton variant="text" width="20%"></Skeleton>

            <Skeleton variant="text" width="20%"></Skeleton>
          </div>
        </div>

        <div className="flex items-center">
          <Skeleton width="100%" variant="text"></Skeleton>
        </div>
      </div>
    </>
  );
};

export default ProfilePageSkeleton;
