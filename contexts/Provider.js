import React from "react";
import { AuthProvider } from "./AuthContext";
import { ImageModalProvider } from "./ImageModalContext";

const Provider = ({ children }) => {
  return (
    <AuthProvider>
      <ImageModalProvider>{children}</ImageModalProvider>
    </AuthProvider>
  );
};

export default Provider;
