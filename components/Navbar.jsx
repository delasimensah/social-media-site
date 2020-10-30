import React from "react";
import { withAuthUser, useAuthUser } from "next-firebase-auth";
// import { authState } from "../contexts/AuthContext";

const Navbar = () => {
  // const { user } = authState();
  const AuthUser = useAuthUser();

  return <div>{AuthUser ? "Signed in" : "Signed Out"}</div>;
};

export default withAuthUser()(Navbar);
