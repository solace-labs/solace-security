import type { NextPage } from "next";
import Head from "next/head";
import ApproveTransaction from "../components/ApproveTransaction";
import ComingSoon from "../components/ComingSoon";

const Approve: NextPage = () => {
  return (
    <>
      <Head>
        <title>Approve Transaction</title>
        <meta name="description" content="Solace Guardian Dashboard" />
        <link rel="icon" href="/solace-icon.png" />
      </Head>
      <div className="flex items-start justify-center h-full md:items-center">
        <ApproveTransaction />
      </div>
    </>
  );
};

export default Approve;
