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

  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    if (!AuthUser.id) {
      return;
    }
    setLoading(true);

    const unsubscribe = firestore
      .doc(`users/${AuthUser.id}`)
      .onSnapshot(async (docSnapshot) => {
        const following = docSnapshot.data().following;
        const username = docSnapshot.data().username;
        console.log(username);

        let feed = [];

        following.forEach(async (personId) => {
          firestore
            .collection("posts")
            .where("userId", "==", personId)
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
              const posts = snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
              });

              feed = [...feed, ...posts];

              //sort based on date created
              feed.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
              });

              setFeed(feed);
              setLoading(false);
            });
        });
      });

    return () => unsubscribe();
  }, [AuthUser.id]);

  // useEffect(() => {
  //   setLoading(true);

  //   const unsubscribe = firestore
  //     .collection("posts")
  //     .orderBy("createdAt", "desc")
  //     .limit(50)
  //     .onSnapshot((snapshot) => {
  //       const data = snapshot.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //       });

  //       setFeed(data);
  //       setLoading(false);
  //     });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

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
