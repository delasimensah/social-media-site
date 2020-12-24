import React from "react";

//mui
import Skeleton from "@material-ui/lab/Skeleton";

const SuggestionSkeleton = () => {
  return (
    <div className="space-y-5">
      {Array(10)
        .fill("")
        .map((_, idx) => {
          return (
            <div key={idx} className="flex items-center space-x-4 ">
              <div className="w-10 h-10">
                <Skeleton
                  variant="circle"
                  width="100%"
                  height="100%"
                ></Skeleton>
              </div>

              <Skeleton variant="text" width="80%"></Skeleton>
            </div>
          );
        })}
    </div>
  );
};

export default SuggestionSkeleton;
