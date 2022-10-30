import Image from "next/image";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import React from "react";
import type { FC, ReactNode } from "react";
import { WalletType } from "./RecoverWallet";
import { useRouter } from "next/router";

type Props = {
  children?: ReactNode;
  data: WalletType;
};

const Wallet: FC<Props> = ({ data }) => {
  const router = useRouter();
  const handleWallet = () => {
    router.push(data.route);
  };

  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer group">
      <div
        onClick={handleWallet}
        className="relative flex items-center justify-center overflow-hidden transition-all bg-black rounded-full w-36 h-36 bg-solace-dark group-hover:shadow-2xl group-hover:shadow-zinc-700">
        <Image
          src={data.logo}
          alt={data.name}
          layout="fill"
          className="scale-110 translate-y-1"
          objectFit="contain"
          // height={100}
          // width={100}
        />
      </div>
      <div className="text-xl font-semibold">{data.name}</div>
    </div>
  );
};

export default Wallet;
