import Image from "next/image";
import React, { FC, ReactNode } from "react";
import logo from "../public/solace-icon.png";

type NavItemType = {
  name: string;
  route: string;
  icon: string;
};

const navItems: NavItemType[] = [
  {
    name: "add a guardian",
    route: "add",
    icon: "add",
  },
];

const SidePanel = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-start gap-4 mb-16">
        <Image src={logo} alt="solace logo" width={40} height={40} />
        <h2 className="font-semibold text-2xl">solace</h2>
      </div>
      <h2 className="text-2xl text-center md:text-3xl lg:text-4xl md:text-left">
        your security center
      </h2>
      <nav className="">
        {navItems.map((navItem) => {
          return <NavItem key={navItem.route} data={navItem} />;
        })}
      </nav>
    </div>
  );
};

type NavItemProps = {
  children?: ReactNode;
  data: NavItemType;
};

const NavItem: FC<NavItemProps> = ({ data }) => {
  return (
    <div>
      <div>{data.icon}</div>
      <p className="">{data.name}</p>
    </div>
  );
};

export default SidePanel;
