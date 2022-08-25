import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  FakeWalletAdapter,
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import React, { useMemo } from "react";
import type { AppProps } from "next/app";

import BaseLayout from "../components/BaseLayout";
import "../styles/globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Testnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      /**
       * Select the wallets you wish to support, by instantiating wallet adapters here.
       *
       * Common adapters can be found in the npm package `@solana/wallet-adapter-wallets`.
       * That package supports tree shaking and lazy loading -- only the wallets you import
       * will be compiled into your application, and only the dependencies of wallets that
       * your users connect to will be loaded.
       */
      new PhantomWalletAdapter(),
      new FakeWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
