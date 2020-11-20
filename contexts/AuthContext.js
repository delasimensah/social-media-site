import React, { createContext, useContext } from "react";
import { auth } from "../firebase/firebaseClient";
import axios from "axios";

const AuthContext = createContext();

export const authState = () => {
  return useContext(AuthContext);
};

const devUrl =
  "http://localhost:5001/social-media-93a8a/us-central1/api/createUser";

const url =
  "https://us-central1-social-media-93a8a.cloudfunctions.net/api/createUser";

export const AuthProvider = ({ children }) => {
  const signin = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  const signup = async (username, email, password) => {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    await user.updateProfile({
      displayName: username,
      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/social-media-93a8a.appspot.com/o/nouser.jpg?alt=media&token=c57bec01-5543-4178-9a4a-8c188235996a",
    });

    const token = await user.getIdToken();

    await axios.post(
      url,
      {
        username,
        email,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
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
