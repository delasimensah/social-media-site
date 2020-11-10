import React from "react";

//components
import Layout from "../components/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="container grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10">
        <div className="">
          <div>posts</div>
        </div>

        <div className="hidden lg:block">sidebar</div>
      </div>
    </Layout>
  );
};

export default HomePage;
