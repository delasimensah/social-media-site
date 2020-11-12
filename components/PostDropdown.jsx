import React from "react";
import Link from "next/link";
import {
  IoNotificationsOutline,
  IoSaveOutline,
  IoPersonRemoveOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";

//components
import DropdownArrow from "./Navbar/DropdownArrow";
import DropdownItem from "./Navbar/DropdownItem";

const DropdownMenu = () => {
  return (
    <>
      <DropdownArrow className="left-[180px] lg:left-24" />

      <div className="overflow-hidden rounded-md shadow-lg">
        <div className="relative grid bg-white dark:bg-dark ">
          <Link href="/profile">
            <DropdownItem>
              <IoSaveOutline className="dropdown-icon" />

              <p className="dropdown-text">Save Post</p>
            </DropdownItem>
          </Link>

          <DropdownItem onClick={() => {}}>
            <IoCloseCircleOutline className="dropdown-icon" />

            <p className="dropdown-text">Hide Post</p>
          </DropdownItem>

          <DropdownItem onClick={() => {}}>
            <IoPersonRemoveOutline className="dropdown-icon" />

            <p className="dropdown-text">Unfolow User</p>
          </DropdownItem>

          <DropdownItem onClick={() => {}}>
            <IoNotificationsOutline className="dropdown-icon" />

            <p className="dropdown-text">Post Notification</p>
          </DropdownItem>
        </div>
      </div>
    </>
  );
};

export default DropdownMenu;
