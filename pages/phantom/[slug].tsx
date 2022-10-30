import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import PhantomWallet, { PhantomType } from "../../components/PhantomWallet";

const Phantom: NextPage = () => {
  const route = useRouter();
  const slug = route?.query?.slug as PhantomType;

  const getTitle = () => {
    switch (slug) {
      case "approve":
        return "Phantom Approve";
      case "recover":
        return "Phantom Recovery";
    }
  };

  return (
    <>
      <Head>
        <title>{getTitle()}</title>
        <meta name="description" content="Solace Guardian Dashboard" />
        <link rel="icon" href="/solace-icon.png" />
      </Head>
      <div className="flex items-start justify-center h-full md:items-center">
        <PhantomWallet type={slug} />
      </div>
    </>
  );
};

export default Phantom;
