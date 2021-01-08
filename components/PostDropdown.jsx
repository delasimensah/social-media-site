import React, { useState } from "react";
import Link from "next/link";
import {
  IoNotificationsOutline,
  IoSaveOutline,
  IoPersonRemoveOutline,
  IoCloseCircleOutline,
  IoTrashOutline,
  IoLogInOutline,
} from "react-icons/io5";
import { withAuthUser, useAuthUser } from "next-firebase-auth";

//components

const DropdownMenu = ({ username, open }) => {
  const AuthUser = useAuthUser();

  return (
    <>
      <div className="overflow-hidden rounded-md shadow-lg">
        <div className="relative grid bg-white dark:bg-dark ">
          {AuthUser.id && username === AuthUser.displayName && (
            <a onClick={open} className="dropdown-item">
              <IoTrashOutline className="text-red-600 dropdown-icon" />

              <p className="text-red-600 dropdown-text">Delete Post</p>
            </a>
          )}

          {AuthUser.id && username !== AuthUser.displayName && (
            <Link href={`/profile/${username}`}>
              <a className="dropdown-item">
                <IoPersonRemoveOutline className="dropdown-icon" />

                <p className="dropdown-text">@{username}</p>
              </a>
            </Link>
          )}

          {!AuthUser.id && (
            <Link href="/auth">
              <a className="dropdown-item">
                <IoLogInOutline className="dropdown-icon" />

                <p className="dropdown-text">Sign In</p>
              </a>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default withAuthUser()(DropdownMenu);
