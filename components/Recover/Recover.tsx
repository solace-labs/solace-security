import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { SolaceGuardian } from "solace-sdk";
import loadingImage from "../../public/loading.svg";
import { PROGRAM_ADDRESS } from "../../utils/constants";

const Recover = () => {
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
    // SolaceSDK.getWalletFromName( , solaceName);
    try {
      const tx = await SolaceGuardian.approveRecoveryByKeypairTx(
        {
          network: "testnet",
          programAddress: PROGRAM_ADDRESS,
          username: solaceName,
        },
        publicKey!.toString()
      );
      const res = await sendTransaction(tx.tx, connection);
      console.log({ res });
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
      toast.error(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <div className="text-2xl font-normal text-center md:text-3xl">
        recover a wallet with phantom
      </div>
      <div className="flex flex-col justify-center w-full gap-2">
        <label htmlFor="username" className="text-gray-500">
          solace username
        </label>
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
            onClick={() => {
              handleRecovery();
            }}
            className="bg-[#3e3455] px-8 py-3 rounded hover:bg-slate-900 font-semibold tracking-widest disabled:bg-slate-900 disabled:cursor-not-allowed disabled:text-gray-600 active:bg-slate-800">
            {loading ? (
              <div className="relative w-6 h-6 animate-spin">
                <Image src={loadingImage} layout="fill" alt="loading" />
              </div>
            ) : (
              "recover"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Recover;
