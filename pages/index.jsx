import React, { useState } from "react";
import posts from "../utils/posts";

//components
import Layout from "../components/Layout";
import CreatePostCard from "../components/CreatePostCard";
import Feed from "../components/Feed";
import ImageModal from "../components/ImageModal";

const HomePage = () => {
  return (
    <Layout>
      <div className="container grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10">
        <div className="space-y-5">
          <CreatePostCard />
          <Feed posts={posts} />
        </div>

        <div className="hidden lg:block bg-white dark:bg-[#202836] shadow-md h-screen rounded-md"></div>
      </div>

      <ImageModal />
    </Layout>
  );
};

export default HomePage;
