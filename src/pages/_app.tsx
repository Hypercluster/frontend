"use client";
import "@rainbow-me/rainbowkit/styles.css";

import * as React from "react";
import "@/styles/globals.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import type { AppProps } from "next/app";

import { darkTheme, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, sepolia, avalancheFuji, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [sepolia, avalancheFuji],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "ZexCraft",
  projectId: process.env.NEXT_PROJECT_ID ?? "0354c8dc98c64f51775522050a4a0cfa",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme({
        accentColor: "#ff5906",
        borderRadius: "large"
      })} >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
