import React from "react";
import Wallet from "./Wallet";
import phantomLogo from "../public/phantom.png";

const wallets = [
  { name: "Phantom", logo: phantomLogo, route: "phantom-recovery" },
];

export type WalletType = typeof wallets[number];

const RecoverWallet = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <h3 className="text-2xl md:text-3xl font-semibold text-center">
        recover a wallet
      </h3>
      <p className="text-lg font-light">choose your guardian</p>
      {wallets.map((wallet) => (
        <Wallet key={wallet.name} data={wallet} />
      ))}
    </div>
  );
};

export default RecoverWallet;
