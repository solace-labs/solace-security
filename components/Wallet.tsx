import React, { FC, ReactElement, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  data: { name: string; logo: ReactElement };
};

const Wallet: FC<Props> = ({ data }) => {
  return (
    <div className="">
      {/* <div className="">{data.logo}</div> */}
      <div className="">{data.name}</div>
    </div>
  );
};

export default Wallet;
