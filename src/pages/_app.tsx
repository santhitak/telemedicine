import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nav } from "./components";

export default function App({ Component, pageProps }: AppProps) {
  return <Nav slot={<Component {...pageProps} />} />;
}
