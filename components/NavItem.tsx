import { useRouter } from "next/router";
import type { FC, ReactNode } from "react";
import { NavItemType } from "../utils/nav-items";

type NavItemProps = {
  children?: ReactNode;
  data: NavItemType;
};

export const NavItem: FC<NavItemProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div
      className="flex flex-row items-center justify-start gap-4 py-8 border-b border-b-gray-800 cursor-pointer hover:font-bold hover:bg-[#161616] hover:pl-2 transition-all"
      onClick={() => router.push(data.route)}>
      <div className="w-6 h-6">{data.icon}</div>
      <p className="">{data.name}</p>
    </div>
  );
};
