import React, { FC, ReactNode } from "react";
import SidePanel from "./SidePanel";

type Props = {
  children: ReactNode;
};

const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen md:h-screen font-poppins">
      <div className="md:w-1/2 lg:w-1/3 bg-black text-gray-100 p-8 md:p-16">
        <SidePanel />
      </div>
      <div className="grow bg-main text-zinc-200 p-8 md:p-16">{children}</div>
    </div>
  );
};

export default BaseLayout;
