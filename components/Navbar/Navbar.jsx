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
import Logo from "../Logo";
import Indicator from "./Indicator";
import { withAuthUser, useAuthUser } from "next-firebase-auth";

const Navbar = () => {
  const AuthUser = useAuthUser();

  return (
    <div className="fixed top-0 left-0 z-10 flex items-center justify-between w-screen px-3 py-5 bg-white shadow-md md:py-3 md:justify-start md:px-16 lg:px-40 dark:bg-dark">
      <Link href="/">
        <a className="w-20">
          <Logo />
        </a>
      </Link>

      <div className="items-center justify-center flex-grow hidden md:flex">
        {AuthUser.id && <SearchInput />}
      </div>

      {AuthUser.id ? (
        <div className="flex items-center space-x-6">
          <MenuLink link="/" icon={<IoHomeOutline className="nav-icon" />} />

          {/* <div className="relative">
            <Indicator />
            <MenuLink
              link="/chat"
              icon={<IoChatbubblesOutline className="nav-icon" />}
            />
          </div> */}

          <div className="relative">
            <Indicator className="top-[4px]" />
            <Dropdown
              icon={<IoNotificationsOutline className="nav-icon " />}
              menu={<Notifications />}
              w="w-72 lg:w-96"
            />
          </div>

          <ColorModeButton />

          <Dropdown image={<ProfileImg />} menu={<DropdownMenu />} w="w-52" />
        </div>
      ) : (
        <div>
          <Link href="/auth">
            <a className="text-purple-600 capitalize">sign in</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default withAuthUser()(Navbar);
