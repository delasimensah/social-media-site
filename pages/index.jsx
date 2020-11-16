import React from "react";
import posts from "../utils/posts";

//components
import Layout from "../components/Layout";
import CreatePostCard from "../components/CreatePostCard";
import Feed from "../components/Feed";
import ImageModal from "../components/ImageModal";
import Suggestions from "../components/Suggestions";

const HomePage = () => {
  return (
    <Layout>
      <div className="container grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10">
        <div className="space-y-5">
          <CreatePostCard />
          <Feed posts={posts} />
        </div>

        <div className="hidden space-y-10 overflow-hidden lg:block">
          <Suggestions />
        </div>
      </div>

      <ImageModal />
    </Layout>
  );
};

export default HomePage;
