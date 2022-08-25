import React from "react";
import Wallet from "./Wallet";
import phantomLogo from "../public/phantom.png";

const wallets = [{ name: "Phantom", logo: phantomLogo }];

export type WalletType = typeof wallets[number];

const AddGuardian = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <h3 className="text-3xl font-semibold">add a guardian</h3>
      <p className="text-lg font-light">choose your guardian</p>
      {wallets.map((wallet) => (
        <Wallet key={wallet.name} data={wallet} />
      ))}
    </div>
  );
};

export default AddGuardian;
