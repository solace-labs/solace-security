import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { SolaceApprovals, SolaceGuardian, SolaceSDK } from "solace-sdk";
import { ApproveTransferData } from "solace-sdk/dist/cjs/sdk/types";
import loadingImage from "../../public/loading.svg";
import { LAMPORTS_PER_SOL, PROGRAM_ADDRESS } from "../../utils/constants";
import { minifyAddress } from "../../utils/helpers";

type OngoingType = typeof SolaceSDK.fetchOngoingTransfers;

type TransferType = Awaited<ReturnType<OngoingType>>[number];

const Approve = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [solaceName, setSolaceName] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState({
    active: "",
    value: false,
  });
  const [ongoingTransfers, setOngoingTransfers] = useState<TransferType[]>([]);

  const handleApprove = async (transfer: TransferType) => {
    if (!publicKey) return;
    const { seedKey, isSplTransfer, threshold, totalApprovals } = transfer;
    setApproveLoading({
      active: seedKey.toString(),
      value: true,
    });

    try {
      const solaceWalletAddress = SolaceSDK.getWalletFromName(
        PROGRAM_ADDRESS,
        solaceName
      ).toString();
      // totalApprovals is 1 less than threshold
      // given guardian isApproved : false
      // TODO: one off then approve and execute if more than one off then approve
      const approveTransferData: ApproveTransferData = {
        solaceWalletAddress,
        guardianAddress: publicKey!.toString(),
        network: "testnet",
        programAddress: PROGRAM_ADDRESS,
        transferKeyAddress: transfer.seedKey.toString(),
      };
      let tx;
      console.log("BEFORE");
      if (threshold - totalApprovals === 1) {
        console.log("FIRST");
        tx = await SolaceApprovals.approveAndExecuteGuardedTransfer(
          approveTransferData
        );
      } else {
        console.log("SECOND");
        tx = await SolaceApprovals.approveGuardedTransfer(approveTransferData);
      }

      const res = await sendTransaction(tx, connection);
      console.log({ res });
      setApproveLoading({
        active: "",
        value: false,
      });
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
      router.push("/approve");
    } catch (e: any) {
      console.log(e);
      toast.error(e.message);
      setApproveLoading({
        active: "",
        value: false,
      });
    }
  };

  const fetchOngoing = async () => {
    setLoading(true);
    try {
      const ongoing = await SolaceSDK.fetchOngoingTransfers(
        solaceName,
        "testnet",
        PROGRAM_ADDRESS
      );
      setOngoingTransfers(ongoing);
      console.log(ongoing);
      setLoading(false);
    } catch (e: any) {
      console.log(e);
      toast.error(e.message);
      setLoading(false);
    }
  };

  const transfersToShow = ongoingTransfers.filter((transfer) => {
    if (
      !transfer.guardianApprovals.find(
        (guardian) => guardian.guardian.toString() === publicKey?.toString()
      )
    ) {
      return false;
    }
    return (
      !transfer.guardianApprovals.find(
        (guardian) => guardian.guardian.toString() === publicKey?.toString()
      )?.isApproved || transfer.threshold >= transfer.totalApprovals
    );
  });

  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <div className="text-2xl font-normal text-center md:text-3xl">
        approve a transaction with phantom
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
              // handleApprove();
              fetchOngoing();
            }}
            className="bg-[#3e3455] px-8 py-3 rounded hover:bg-slate-900 font-semibold tracking-widest disabled:bg-slate-900 disabled:cursor-not-allowed disabled:text-gray-600 active:bg-slate-800">
            {loading ? (
              <div className="relative w-6 h-6 animate-spin">
                <Image src={loadingImage} layout="fill" alt="loading" />
              </div>
            ) : (
              "get transactions"
            )}
          </button>
        )}
      </div>
      {transfersToShow.length > 0 && (
        <div className="flex flex-col w-full gap-2 overflow-scroll border-b border-zinc-700 h-96">
          {transfersToShow.map((transfer) => {
            const {
              seedKey,
              threshold,
              totalApprovals,
              amount,
              mint,
              senderTokenAccount,
            } = transfer;
            console.log(mint, senderTokenAccount);
            return (
              <div
                className="flex flex-row items-center justify-between py-4 border-t border-zinc-700"
                key={seedKey.toString()}>
                <div className="flex flex-col">
                  <p className="font-semibold">
                    {mint ? minifyAddress(mint!, 4) : "SOL"}
                  </p>
                  <p className="text-lg text-blue-400">
                    {amount / LAMPORTS_PER_SOL}
                  </p>
                </div>
                <p className="text-sm font-semibold text-orange-400">
                  {totalApprovals}/{threshold} approvals
                </p>
                <p className="text-sm">
                  {senderTokenAccount
                    ? `${minifyAddress(senderTokenAccount, 4)} (${solaceName})`
                    : solaceName}
                </p>
                <button
                  disabled={solaceName.trim() === ""}
                  onClick={() => {
                    handleApprove(transfer);
                  }}
                  className="px-8 py-3 font-semibold tracking-widest bg-green-800 rounded hover:bg-green-900 disabled:bg-slate-900 disabled:cursor-not-allowed disabled:text-gray-600 active:bg-green-800">
                  {approveLoading.value &&
                  seedKey.toString() === approveLoading.active ? (
                    <div className="relative w-6 h-6 animate-spin">
                      <Image src={loadingImage} layout="fill" alt="loading" />
                    </div>
                  ) : (
                    "approve"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Approve;
