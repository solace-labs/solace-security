import React from "react";
import type { FC, ReactNode } from "react";
import SidePanel from "./SidePanel";

type Props = {
  children: ReactNode;
};

const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen md:flex-row md:h-screen font-poppins">
      <div className="p-8 text-gray-100 bg-black md:w-1/2 lg:w-1/3 md:p-16">
        <SidePanel />
      </div>
      <div className="p-8 grow bg-main text-zinc-200 md:p-16">{children}</div>
    </div>
  );
};

export default BaseLayout;
