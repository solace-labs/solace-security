import type { NextPage } from "next";
import Head from "next/head";

const Cancel: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cancel Recovery</title>
        <meta name="description" content="Solace Guardian Dashboard" />
        <link rel="icon" href="/solace-icon.png" />
      </Head>
      <div className="flex items-start md:items-center justify-center h-full">
        <h1 className="text-4xl">cancel</h1>
      </div>
    </>
  );
};

export default Cancel;
