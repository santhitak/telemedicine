import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nav } from "./components";
import { useEffect, useState } from "react";
import { SignUpInformation } from "./sign-up";
import StoreProvider from "@/lib/StoreProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider {...pageProps.initialZustandState}>
      <Nav slot={<Component {...pageProps} />} />
    </StoreProvider>
  );
}
