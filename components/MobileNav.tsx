import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import logo from "../public/solace-icon.png";
import { navItems } from "../utils/nav-items";
import { NavItem } from "./NavItem";

const MobileNav = () => {
  const router = useRouter();

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const goTo = (link: string) => {
    router.push(link);
    closeMobileMenu();
  };

  const openMobileMenu = () => {
    if (mobileMenuRef && mobileMenuRef.current) {
      mobileMenuRef.current.style.display = "block";
    }
  };
  const closeMobileMenu = () => {
    if (mobileMenuRef && mobileMenuRef.current) {
      mobileMenuRef.current.style.display = "none";
    }
  };
  useEffect(() => {
    if (mobileMenuRef && mobileMenuRef.current) {
      mobileMenuRef.current.style.display = "none";
    }
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between gap-4cursor-pointer">
        <div
          className="flex flex-row gap-2 items-center"
          onClick={() => router.push("/")}>
          <Image src={logo} alt="solace logo" width={40} height={40} />
          <h2 className="text-2xl font-semibold">solace</h2>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 cursor-pointer hover:text-gray-200 active:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={openMobileMenu}
          strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
      {/* <h2 className="mb-4 text-2xl text-center md:text-3xl lg:text-4xl md:text-left">
        secure your wallet
      </h2> */}

      <div
        ref={mobileMenuRef}
        className="fixed top-0 left-0 hidden w-screen h-screen  backdrop-blur-sm z-50 bg-[rgba(0,0,0,1)]">
        <div className="flex flex-row items-center justify-end p-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 cursor-pointer md:hidden hover:text-gray-200 active:text-white"
            fill="none"
            viewBox="0 0 24 24"
            onClick={closeMobileMenu}
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex flex-col items-center justify-between gap-10 p-10 lowercase">
          {navItems.map((navItem) => {
            return (
              <div
                key={navItem.route}
                onClick={() => goTo(navItem.route)}
                className="text-xl flex flex-row items-center gap-2 justify-center text-gray-100 cursor-pointer hover:text-white hover:underline">
                <div className="w-6 h-6">{navItem.icon}</div>
                <p>{navItem.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
