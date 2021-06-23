import React from "react";
import {
  IoChatbubblesOutline,
  IoNotificationsOutline,
  IoHomeOutline,
} from "react-icons/io5";

//components
import ColorModeButton from "./ColorModeButton";
import Dropdown from "./Dropdown";
import MenuLink from "./MenuLink";
import Notifications from "./Notifications";
import ProfileImg from "./ProfileImg";
import OtherLinks from "./OtherLinks";
import SearchInput from "./SearchInput";

const Navbar = () => {
  return (
    <div className="sticky flex items-center justify-between md:justify-start px-3 md:px-16 lg:px-40 py-3 dark:text-white dark:bg-[#151a23] shadow-md">
      <div className="text-[30px] italic font-semibold tracking-wide">
        Social
      </div>

      <div className="items-center justify-center flex-grow hidden md:flex">
        <SearchInput />
      </div>

      <div className="flex items-center space-x-6">
        <MenuLink link="/" icon={<IoHomeOutline className="nav-icon" />} />

        <MenuLink
          link="/"
          icon={<IoChatbubblesOutline className="nav-icon" />}
        />

        <Dropdown
          icon={<IoNotificationsOutline className="nav-icon" />}
          menu={<Notifications />}
        />

        <ColorModeButton />

        <Dropdown image={<ProfileImg />} menu={<OtherLinks />} />
      </div>
    </div>
  );
};

export default Navbar;
