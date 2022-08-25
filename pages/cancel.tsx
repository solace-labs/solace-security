import type { NextPage } from "next";
import Head from "next/head";
import ComingSoon from "../components/ComingSoon";

const Cancel: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cancel Recovery</title>
        <meta name="description" content="Solace Guardian Dashboard" />
        <link rel="icon" href="/solace-icon.png" />
      </Head>
      <div className="flex items-start md:items-center justify-center h-full">
        <ComingSoon />
      </div>
    </>
  );
};

export default Cancel;
