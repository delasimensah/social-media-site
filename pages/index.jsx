import React, { useState, useEffect } from "react";
import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { firestore } from "../firebase/firebaseClient";

//components
import Layout from "../components/Layout";
import CreatePostCard from "../components/CreatePostCard";
import Feed from "../components/Feed";
import Suggestions from "../components/Suggestions";
import FeedSkeleton from "../components/Skeletons/FeedSkeleton";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = firestore
      .collection("posts")
      .orderBy("createdAt", "desc")
      .limit(50)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setFeed(data);
        setLoading(false);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Layout>
      <div className="container grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10">
        <div className="space-y-5">
          <CreatePostCard />

          {loading ? <FeedSkeleton /> : <Feed posts={feed} />}
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
