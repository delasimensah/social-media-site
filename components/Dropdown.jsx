import React from "react";
import { Popover } from "@headlessui/react";
import Fade from "react-reveal/Fade";

const Dropdown = ({ icon, image, menu }) => {
  return (
    <Popover className="relative inline h-auto border" as="a">
      <Popover.Button>{icon || image}</Popover.Button>

      <Popover.Panel className="absolute z-10">
        <Fade bottom duration={500} distance="30px">
          {menu}
        </Fade>
      </Popover.Panel>
    </Popover>
  );
};

export default Dropdown;
