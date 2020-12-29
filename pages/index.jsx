import React, { useState, useEffect } from "react";
import {
  useAuthUser,
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
  const AuthUser = useAuthUser();

  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState([]);

  // const getFeed = async () => {
  //   setLoading(true);
  //   let feed = [];
  //   //get user posts
  //   const userPostsSnapshot = await firestore
  //     .collection(`posts`)
  //     .where("username", "==", AuthUser.displayName)
  //     .get();
  //   const data = userPostsSnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));

  //   feed = [...data];

  //   //get posts of people following
  //   const userSnapshot = await firestore.doc(`users/${AuthUser.id}`).get();
  //   const userFollowing = userSnapshot.data().following;

  //   userFollowing.forEach(async (userId) => {
  //     const snapshot = await firestore
  //       .collection("posts")
  //       .where("userId", "==", userId)
  //       .get();

  //     const posts = snapshot.docs.map((doc) => {
  //       return { id: doc.id, ...doc.data() };
  //     });

  //     feed = [...feed, ...posts];

  //     feed.sort((a, b) => {
  //       return new Date(b.createdAt) - new Date(a.createdAt);
  //     });

  //     setFeed(feed);
  //     setLoading(false);
  //   });
  // };

  useEffect(() => {
    if (!AuthUser.id) {
      return;
    }

    const getFeed = async () => {
      const userSnapshot = await firestore.doc(`users/${AuthUser.id}`).get();
      const userFollowing = userSnapshot.data().following;

      return firestore
        .collection("posts")
        .orderBy("createdAt", "desc")
        .limit(100)
        .onSnapshot((snapshot) => {
          const posts = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          let feed = [];

          const userPosts = posts.filter(
            (post) => post.username === AuthUser.displayName
          );
          feed = [...feed, ...userPosts];

          userFollowing.forEach((userId) => {
            const filteredPosts = posts.filter(
              (post) => post.userId === userId
            );

            feed = [...feed, ...filteredPosts];
          });

          feed.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });

          setFeed(feed);
          setLoading(false);
        });
    };

    return getFeed();
  }, [AuthUser.id]);

  return (
    <Layout>
      <div className="container grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-10">
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
