import Head from "next/head";
import initAuth from "../firebase/initAuth";
import Provider from "../contexts/Provider";

import "../styles/globals.css";

initAuth();

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Social Media</title>
        <meta name="description" content="Social media website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default MyApp;
