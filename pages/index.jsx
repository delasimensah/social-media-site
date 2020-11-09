import React from "react";

//components
import Layout from "../components/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="min-h-screen w-[90vw] lg:w-[70vw] mx-auto grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10">
        <div className="">posts</div>

        <div className="hidden lg:block">sidebar</div>
      </div>
    </Layout>
  );
};

export default HomePage;
