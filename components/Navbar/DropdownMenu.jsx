import React from "react";
import Link from "next/link";
import { IoPersonOutline, IoLogOutOutline } from "react-icons/io5";

//components
import DropdownArrow from "./DropdownArrow";
import DropdownItem from "./DropdownItem";

const DropdownMenu = () => {
  return (
    <>
      <DropdownArrow className="left-[180px] lg:left-24" />

      <div className="overflow-hidden rounded-md shadow-lg">
        <div className="relative grid bg-white dark:bg-dark ">
          <Link href="/profile">
            <DropdownItem>
              <IoPersonOutline className="dropdown-icon" />

              <p className="dropdown-text">Profile</p>
            </DropdownItem>
          </Link>

          <DropdownItem onClick={() => {}}>
            <IoLogOutOutline className="dropdown-icon" />

            <p className="dropdown-text">Sign Out</p>
          </DropdownItem>
        </div>
      </div>
    </>
  );
};

export default DropdownMenu;
