import React, { FC } from "react";
import Approve from "./Approve/Approve";
import ComingSoon from "./ComingSoon";
import Recover from "./Recover/Recover";

export type PhantomType = "recover" | "approve";

type PhantomWalletProps = {
  type: PhantomType;
};

const PhantomWallet: FC<PhantomWalletProps> = ({ type }) => {
  // const onClick = useCallback(async () => {
  //   console.log("CLICKED");
  //   try {
  //     if (!publicKey) throw new WalletNotConnectedError();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [publicKey]);
  if (type === "recover") return <Recover />;
  if (type === "approve") return <Approve />;
  return <ComingSoon />;
};

export default PhantomWallet;
