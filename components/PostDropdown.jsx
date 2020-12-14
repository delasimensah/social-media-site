import React, { useState } from "react";
import Link from "next/link";
import {
  IoNotificationsOutline,
  IoSaveOutline,
  IoPersonRemoveOutline,
  IoCloseCircleOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { withAuthUser, useAuthUser } from "next-firebase-auth";
import { firestore } from "../firebase/firebaseClient";

//components
import DropdownItem from "./Navbar/DropdownItem";

const DropdownMenu = ({ post: { username, id } }) => {
  const AuthUser = useAuthUser();

  const deletePost = async () => {
    try {
      await firestore.doc(`posts/${id}`).delete();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-md shadow-lg">
        <div className="relative grid bg-white dark:bg-dark ">
          {username === AuthUser.displayName && (
            <DropdownItem onClick={deletePost}>
              <IoTrashOutline className="text-red-600 dropdown-icon" />

              <p className="text-red-600 dropdown-text">Delete Post</p>
            </DropdownItem>
          )}

          {username !== AuthUser.displayName && (
            <DropdownItem onClick={() => {}}>
              <IoPersonRemoveOutline className="dropdown-icon" />

              <p className="dropdown-text">Unfollow User</p>
            </DropdownItem>
          )}
        </div>
      </div>
    </>
  );
};

export default withAuthUser()(DropdownMenu);
