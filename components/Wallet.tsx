import Image from "next/image";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import React from "react";
import type { FC, ReactNode } from "react";
import { WalletType } from "./AddGuardian";

type Props = {
  children?: ReactNode;
  data: WalletType;
};

const Wallet: FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer group">
      <div className="w-32 h-32 transition-all rounded-full bg-solace-dark group-hover:shadow-2xl group-hover:shadow-gray-700">
        <Image
          src={data.logo}
          alt={data.name}
          objectFit="cover"
          height={128}
          width={128}
        />
      </div>
      <div className="text-xl font-semibold">{data.name}</div>
      <div className="flex flex-row gap-4">
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>
    </div>
  );
};

export default Wallet;
