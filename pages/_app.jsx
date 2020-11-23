import React, { useEffect } from "react";
import Head from "next/head";
import Provider from "../contexts/Provider";
import initAuth from "../firebase/initAuth";

import "../styles/globals.css";

initAuth();

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Social</title>
        <meta name="description" content="Social media website" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default MyApp;