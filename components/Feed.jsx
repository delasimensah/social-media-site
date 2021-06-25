import React from "react";

//components
import Post from "./Post";

const Feed = ({ posts, open, setOpen, setImg }) => {
  return (
    <div className="pb-10 space-y-5">
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            post={post}
            open={open}
            setOpen={setOpen}
            setImg={setImg}
          />
        );
      })}
    </div>
  );
};

export default Feed;
