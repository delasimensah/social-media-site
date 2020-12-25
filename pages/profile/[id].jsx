import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { firestore } from "../../firebase/firebaseClient";

//components
import Layout from "../../components/Layout";
// import CreatePostCard from "../../components/CreatePostCard";
import Feed from "../../components/Feed";
import Suggestions from "../../components/Suggestions";
import ProfilePageSkeleton from "../../components/Skeletons/ProfilePageSkeleton";
import ProfileInfo from "../../components/ProfileInfo";
import FeedSkeleton from "../../components/Skeletons/FeedSkeleton";
import EmptyMessage from "../../components/EmptyMessage";

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [fetching, setFetching] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const unsubscribe = firestore
      .collection("users")
      .where("username", "==", id)
      .limit(1)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (data.length === 0) {
          setUserInfo(null);
        }

        setUserInfo(data[0]);
        setFetching(false);
      });

    return () => {
      unsubscribe();
    };
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const unsubscribe = firestore
      .collection("posts")
      .where("username", "==", id)
      .orderBy("createdAt", "desc")
      .limit(50)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setPosts(data);
        setLoading(false);
      });

    return () => {
      unsubscribe();
    };
  }, [id]);

  if (!fetching && !userInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        Sorry user does not exist
      </div>
    );
  }

  return (
    <Layout>
      <div className="container">
        {fetching ? (
          <ProfilePageSkeleton />
        ) : (
          <ProfileInfo userInfo={userInfo} posts={posts} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10">
          <div className="space-y-5">
            {/* {AuthUser.id && <CreatePostCard />} */}
            {loading ? (
              <FeedSkeleton />
            ) : posts.length === 0 ? (
              <EmptyMessage message="You have no posts" />
            ) : (
              <Feed posts={posts} />
            )}
          </div>

          <div className="hidden space-y-10 overflow-hidden lg:block">
            <Suggestions />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
