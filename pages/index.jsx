import React from "react";
import posts from "../utils/posts";
import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

//components
import Layout from "../components/Layout";
import CreatePostCard from "../components/CreatePostCard";
import Feed from "../components/Feed";
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
    </Layout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

//needed for client side routing when logged out
export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(HomePage);
