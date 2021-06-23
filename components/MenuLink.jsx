import React from "react";
import Link from "next/link";

const MenuLink = ({ link, icon }) => {
  return (
    <Link href={link}>
      <a>{icon}</a>
    </Link>
  );
};

export default MenuLink;
