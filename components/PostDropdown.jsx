import React from "react";
import Link from "next/link";
import {
  IoNotificationsOutline,
  IoSaveOutline,
  IoPersonRemoveOutline,
  IoCloseCircleOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { withAuthUser, useAuthUser } from "next-firebase-auth";

//components
import DropdownArrow from "./Navbar/DropdownArrow";
import DropdownItem from "./Navbar/DropdownItem";

const DropdownMenu = ({ username }) => {
  const AuthUser = useAuthUser();

  return (
    <>
      {/* <DropdownArrow className="left-[180px] lg:left-24" /> */}

      <div className="overflow-hidden rounded-md shadow-lg">
        <div className="relative grid bg-white dark:bg-dark ">
          {/* {username !== AuthUser.displayName && (
            <DropdownItem>
              <IoSaveOutline className="dropdown-icon" />

              <p className="dropdown-text">Save Post</p>
            </DropdownItem>
          )} */}

          {username === AuthUser.displayName && (
            <DropdownItem>
              <IoTrashOutline className="text-red-600 dropdown-icon" />

              <p className="text-red-600 dropdown-text">Delete Post</p>
            </DropdownItem>
          )}

          {/* {username !== AuthUser.displayName && (
            <DropdownItem onClick={() => {}}>
              <IoCloseCircleOutline className="dropdown-icon" />

              <p className="dropdown-text">Hide Post</p>
            </DropdownItem>
          )} */}

          {username !== AuthUser.displayName && (
            <DropdownItem onClick={() => {}}>
              <IoPersonRemoveOutline className="dropdown-icon" />

              <p className="dropdown-text">Unfollow User</p>
            </DropdownItem>
          )}

          {/* {username !== AuthUser.displayName && (
            <DropdownItem onClick={() => {}}>
              <IoNotificationsOutline className="dropdown-icon" />

              <p className="dropdown-text">Post Notification</p>
            </DropdownItem>
          )} */}
        </div>
      </div>
    </>
  );
};

export default withAuthUser()(DropdownMenu);
