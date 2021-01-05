import React, { useEffect } from "react";
import Head from "next/head";
import Provider from "../contexts/Provider";
import initAuth from "../firebase/initAuth";

import "../styles/globals.css";
import "react-awesome-lightbox/build/style.css";

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
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default MyApp;
