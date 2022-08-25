import type { NextPage } from "next";
import Head from "next/head";
import PhantomWallet from "../components/PhantomWallet";

const Phantom: NextPage = () => {
  return (
    <>
      <Head>
        <title>Phantom Recovery</title>
        <meta name="description" content="Solace Guardian Dashboard" />
        <link rel="icon" href="/solace-icon.png" />
      </Head>
      <div className="flex items-start justify-center h-full md:items-center">
        <PhantomWallet />
      </div>
    </>
  );
};

export default Phantom;
