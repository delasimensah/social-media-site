import React, { useState } from "react";
import posts from "../utils/posts";

//components
import Layout from "../components/Layout";
import CreatePostCard from "../components/CreatePostCard";
import Feed from "../components/Feed";
import Modal from "../components/Modal";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState("");
  return (
    <Layout>
      <div className="container grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10">
        <div className="space-y-5">
          <CreatePostCard />
          <Feed posts={posts} open={open} setOpen={setOpen} setImg={setImg} />
        </div>

        <div className="hidden lg:block bg-white dark:bg-[#202836] shadow-md h-screen rounded-md"></div>
      </div>

      <Modal open={open} setOpen={setOpen} img={img} />
    </Layout>
  );
};

export default HomePage;
