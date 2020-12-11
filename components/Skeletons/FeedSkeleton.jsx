import React from "react";

//mui
import Skeleton from "@material-ui/lab/Skeleton";

const FeedSkeleton = () => {
  return (
    <div className="pb-10 space-y-5">
      {Array(5)
        .fill("")
        .map((_, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#202836] rounded-md shadow-md p-5 space-y-3"
          >
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 md:w-12 md:h-12">
                <Skeleton
                  variant="circle"
                  width="100%"
                  height="100%"
                ></Skeleton>
              </div>

              <div className="flex-grow">
                <Skeleton variant="text" width="40%"></Skeleton>
                <Skeleton variant="text" width="30%"></Skeleton>
              </div>
            </div>

            <div className="">
              <Skeleton variant="text" width="70%"></Skeleton>
              <Skeleton variant="text" width="60%"></Skeleton>
              <Skeleton variant="text" width="50%"></Skeleton>
            </div>

            <div className="flex items-center space-x-5">
              <Skeleton variant="text" width="40%"></Skeleton>

              <Skeleton variant="text" width="40%"></Skeleton>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FeedSkeleton;
