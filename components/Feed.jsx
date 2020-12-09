import React from "react";

//components
import Post from "./Post";

const Feed = ({ posts }) => {
  return (
    <div className="pb-10 space-y-5">
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Feed;
