export const NETWORK: "testnet" | "local" = "testnet";
export const PROGRAM_ADDRESS =
  NETWORK === "testnet"
    ? "8FRYfiEcSPFuJd27jkKaPBwFCiXDFYrnfwqgH9JFjS2U"
    : "3CvPZTk1PYMs6JzgiVNFtsAeijSNwbhrQTMYeFQKWpFw";
export const LAMPORTS_PER_SOL = 1000000000;
