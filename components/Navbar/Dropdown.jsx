import React from "react";
import { Popover } from "@headlessui/react";
import Fade from "react-reveal/Fade";

const Dropdown = ({ icon, image, menu, w }) => {
  return (
    <Popover className="relative cursor-pointer">
      <Popover.Button className="relative top-[4px]">
        {icon || image}
      </Popover.Button>

      <Popover.Panel
        className={`absolute z-10 mt-5 transform -translate-x-44 lg:-translate-x-1/2 lg:left-1/2 text-gray-900 dark:text-white ${w}`}
      >
        {menu}
      </Popover.Panel>
    </Popover>
  );
};

export default Dropdown;
