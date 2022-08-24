import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, ReactNode } from "react";
import logo from "../public/solace-icon.png";
import { navItems, NavItemType } from "../utils/nav-items";

const SidePanel = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div
        className="flex flex-row items-center justify-start gap-4 mb-16 cursor-pointer"
        onClick={() => router.push("/")}>
        <Image src={logo} alt="solace logo" width={40} height={40} />
        <h2 className="font-semibold text-2xl">solace</h2>
      </div>
      <h2 className="text-2xl text-center md:text-3xl lg:text-4xl md:text-left mb-12">
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
  const router = useRouter();
  return (
    <div
      className="flex flex-row items-center justify-start gap-4 py-8 border-b border-b-gray-800 cursor-pointer hover:font-bold"
      onClick={() => router.push(data.route)}>
      <div className="h-6 w-6">{data.icon}</div>
      <p className="">{data.name}</p>
    </div>
  );
};

export default SidePanel;
