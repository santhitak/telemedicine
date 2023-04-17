import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nav } from "./components";
import { useEffect, useState } from "react";
import { SignUpInformation } from "./sign-up";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<SignUpInformation>({
    fullname: "",
    uuid: "",
    email: "",
    password: "",
    age: 0,
    gender: "",
  });

  return (
    <Nav
      slot={<Component {...pageProps} user={user} setUser={setUser} />}
      user={user}
      setUser={setUser}
    />
  );
}
