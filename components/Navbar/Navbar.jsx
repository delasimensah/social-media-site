import React from "react";
import {
  IoChatbubblesOutline,
  IoNotificationsOutline,
  IoHomeOutline,
} from "react-icons/io5";
import Link from "next/link";

//components
import ColorModeButton from "./ColorModeButton";
import Dropdown from "./Dropdown";
import MenuLink from "./MenuLink";
import Notifications from "./Notifications";
import ProfileImg from "./ProfileImg";
import DropdownMenu from "./DropdownMenu";
import SearchInput from "./SearchInput";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <div className="sticky flex items-center justify-between px-3 py-2 bg-white shadow-md md:justify-start md:px-16 lg:px-40 dark:bg-dark">
      <Link href="/">
        <a className="w-16">
          <Logo className="fill-current dark:text-white" />
        </a>
      </Link>

      <div className="items-center justify-center flex-grow hidden md:flex">
        <SearchInput />
      </div>

      <div className="flex items-center space-x-6">
        <MenuLink link="/" icon={<IoHomeOutline className="nav-icon" />} />

        <MenuLink
          link="/chat"
          icon={<IoChatbubblesOutline className="nav-icon" />}
        />

        <Dropdown
          icon={<IoNotificationsOutline className="nav-icon" />}
          menu={<Notifications />}
          w="w-72 lg:w-96"
        />

        <ColorModeButton />

        <Dropdown image={<ProfileImg />} menu={<DropdownMenu />} w="w-52" />
      </div>
    </div>
  );
};

export default Navbar;
