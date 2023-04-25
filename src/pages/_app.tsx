import "@/styles/globals.css";
import type { AppProps } from "next/app";
import StoreProvider from "@/lib/StoreProvider";
import { Nav } from "./components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider {...pageProps.initialZustandState}>
      <Nav slot={<Component {...pageProps} />} />
    </StoreProvider>
  );
}
