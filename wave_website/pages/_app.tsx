import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);

  /* A React hook that is used to run a function after the component is rendered. */
  useEffect(() => {
    setShowChild(true);
  }, []);

  /* This is a way to prevent the app from rendering on the server side. */
  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return <Component {...pageProps} />;
  }
}
