import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/firebaseClient";
import { withAuthUser, useAuthUser } from "next-firebase-auth";

//components
import SuggestionSkeleton from "./Skeletons/SuggestionSkeleton";
import SuggestionCard from "./SuggestionCard";

const Suggestions = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const AuthUser = useAuthUser();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firestore
      .collection("users")
      .orderBy("createdAt", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setUsers(data);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-10 bg-white dark:bg-[#202836] shadow-md rounded-md px-5 py-10">
      <h1 className="text-lg font-medium dark:text-white">
        Suggestions for you
      </h1>

      {loading ? (
        <SuggestionSkeleton />
      ) : (
        <div className="space-y-5">
          {users
            .filter((user) => user.id !== AuthUser.id)
            .map((sugg, idx) => (
              <SuggestionCard key={idx} sugg={sugg} />
            ))}
        </div>
      )}
    </div>
  );
};

export default withAuthUser()(Suggestions);
