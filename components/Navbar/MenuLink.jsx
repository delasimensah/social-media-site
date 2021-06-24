import React from "react";
import Link from "next/link";

const MenuLink = ({ link, icon }) => {
  return (
    <div className="border">
      <Link href={link}>
        <a>{icon}</a>
      </Link>
    </div>
  );
};

export default MenuLink;
