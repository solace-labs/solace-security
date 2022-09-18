import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import logo from "../public/solace-icon.png";
import { navItems } from "../utils/nav-items";
import { NavItem } from "./NavItem";

const SidePanel = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div
        className="flex flex-row items-center justify-start gap-4 mb-16 cursor-pointer"
        onClick={() => router.push("/")}>
        <Image src={logo} alt="solace logo" width={40} height={40} />
        <h2 className="text-2xl font-semibold">solace</h2>
      </div>
      <h2 className="mb-12 text-2xl text-center md:text-3xl lg:text-4xl md:text-left">
        secure your wallet
      </h2>

      <nav className="">
        {navItems.map((navItem) => {
          return <NavItem key={navItem.route} data={navItem} />;
        })}
      </nav>
    </div>
  );
};

export default SidePanel;
