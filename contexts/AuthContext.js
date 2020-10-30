import React, { createContext, useContext } from "react";
import { auth } from "../firebase/firebaseClient";

const AuthContext = createContext();

export const authState = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const login = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  const register = async (credentials) => {
    const { email, password } = credentials;

    await auth.createUserWithEmailAndPassword(email, password);
  };

  const logout = async () => {
    await auth.signOut();
  };

  const resetPassword = async (email) => {
    await auth.sendPasswordResetEmail(email);
  };

  const value = {
    login,
    register,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
