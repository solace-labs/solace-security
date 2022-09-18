import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
// import { SolaceSDK } from "../solace-sdk/sdk";
import { SolaceSDK } from "solace-sdk";

export const PROGRAM_ADDRESS = "8FRYfiEcSPFuJd27jkKaPBwFCiXDFYrnfwqgH9JFjS2U";

const PhantomWallet = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [solaceName, setSolaceName] = useState("");
  const [loading, setLoading] = useState(false);

  // const onClick = useCallback(async () => {
  //   console.log("CLICKED");
  //   try {
  //     if (!publicKey) throw new WalletNotConnectedError();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [publicKey]);
  const handleRecovery = async () => {
    setLoading(true);
    // KeyPair.fromSecretKey()
    console.log("Recovering");
    try {
      console.log("recovering");
      const tx = await SolaceSDK.approveRecoveryByKeypairTx(
        {
          network: "testnet",
          programAddress: PROGRAM_ADDRESS,
          username: solaceName,
        },
        publicKey!.toString()
      );
      // const res = connection.sendTransaction(tx);
      console.log({ tx });
      const res = await sendTransaction(tx.tx, connection);
      console.log({ res });

      // TODO: confirm transaction todo
      // await connection.confirmTransaction({
      //   signature: res!,
      //   blockhash: tx!.tx!.recentBlockhash!,
      //   lastValidBlockHeight: tx.tx.lastValidBlockHeight!,
      // });

      // console.log({ connection });
      setLoading(false);
      toast.success(() => {
        return (
          <div className="flex flex-row gap-5 cursor-default">
            <p className="text-gray-300">approved</p>
            <a
              rel="noreferrer"
              href={`https://solscan.io/tx/${res}?cluster=testnet`}
              target="_blank">
              <p className="text-blue-500 underline cursor-pointer">
                {res.slice(1, 12)}...
              </p>
            </a>
          </div>
        );
      });
    } catch (e: any) {
      console.log(e);
      // setError("server error");
      toast.error(e.message);
      setLoading(false);
    }
    // const res = await SolaceSDK.localConnection.sendTransaction(tx.tx, [
    //   publicKey!,
    // ]);
    // console.log(await SolaceSDK.localConnection.confirmTransaction(res));
    // const data = await SolaceSDK.fetchDataForWallet(
    //   SolaceSDK.getWalletFromName(PROGRAM_ADDRESS, "name.solace.io"),
    //   solaceSdk.program
    // );
  };

  // useEffect(() => {
  //   onClick();
  // }, [publicKey]);

  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <div className="text-2xl md:text-3xl font-normal text-center">
        recover a wallet with phantom
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-2">
        {/* <label htmlFor="username">solace username</label> */}
        <input
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setSolaceName(e.target.value)}
          value={solaceName}
          placeholder="solace username"
          className="w-full bg-black border rounded border-zinc-900 focus:outline-none focus:ring-zinc-700 focus:border-zinc-900"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 pb-40 md:w-auto md:flex-row md:pb-0">
        <WalletMultiButton />
        {publicKey && (
          <button
            disabled={solaceName.trim() === ""}
            onClick={() => handleRecovery()}
            className="bg-[#3e3455] px-8 py-3 rounded hover:bg-slate-900 font-semibold tracking-widest disabled:bg-slate-900 disabled:cursor-not-allowed disabled:text-gray-600 active:bg-slate-800">
            {loading ? "recovering..." : "recover"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PhantomWallet;
