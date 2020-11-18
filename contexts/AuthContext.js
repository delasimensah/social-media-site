import React, { createContext, useContext } from "react";
import { auth, functions, firestore } from "../firebase/firebaseClient";

const AuthContext = createContext();

export const authState = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const signin = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  const signup = async (username, email, password) => {
    const snapshot = await firestore
      .collection(`users`)
      .where("username", "==", username)
      .get();

    if (!snapshot.empty) {
      throw new Error("Username exists");
    }

    await auth.createUserWithEmailAndPassword(email, password);

    await auth.currentUser.updateProfile({
      displayName: username,
      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/social-media-93a8a.appspot.com/o/nouser.jpg?alt=media&token=c57bec01-5543-4178-9a4a-8c188235996a",
    });

    await functions.httpsCallable("createUser")({
      username,
      email,
    });
  };

  const signout = async () => {
    await auth.signOut();
  };

  const resetPassword = async (email) => {
    await auth.sendPasswordResetEmail(email);
  };

  const value = {
    signin,
    signup,
    signout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
