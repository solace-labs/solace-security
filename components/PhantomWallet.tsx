import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import React, { useCallback, useEffect, useRef, useState } from "react";

const PhantomWallet = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [solaceName, setSolaceName] = useState("");

  // const onClick = useCallback(async () => {
  //   console.log("CLICKED");
  //   try {
  //     if (!publicKey) throw new WalletNotConnectedError();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [publicKey]);

  // useEffect(() => {
  //   onClick();
  // }, [publicKey]);

  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <div className="text-3xl font-normal">recover a wallet with phantom</div>
      <div className="flex flex-col items-center justify-center w-full gap-2">
        {/* <label htmlFor="username">solace username</label> */}
        <input
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setSolaceName(e.target.value)}
          placeholder="solace username"
          className="w-full bg-black border rounded border-zinc-900 focus:outline-none focus:ring-zinc-700 focus:border-zinc-900"
        />
      </div>
      <div className="flex flex-row gap-4 pb-40 md:pb-0">
        <WalletMultiButton />
        {publicKey && (
          <button
            disabled={solaceName.trim() === ""}
            className="bg-[#512da8] px-8 py-3 rounded hover:bg-slate-900 font-semibold tracking-widest disabled:bg-slate-900 disabled:cursor-not-allowed disabled:text-gray-600 active:bg-slate-800">
            recover
          </button>
        )}
      </div>
    </div>
  );
};

export default PhantomWallet;
