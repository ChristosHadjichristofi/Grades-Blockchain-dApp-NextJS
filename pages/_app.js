import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import Head from 'next/head';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Toaster } from "react-hot-toast";

import { ContractsContextProvider } from '../store/contract-context';
import { UserContextProvider } from "../store/user-context";
import { Web3ReactProvider } from "@web3-react/core";

import { Web3Provider } from "@ethersproject/providers";

const getLibrary = (provider) => {
    return new Web3Provider(provider);
};

function App({ Component, pageProps }) {

    return (
    <div id="general-container">
        <Toaster/>

        <Head>
            <link rel="shortcut icon" href="/images/ntua_logo.png" />
        </Head>

        <UserContextProvider>
            <ContractsContextProvider>
                <Web3ReactProvider getLibrary={getLibrary}>
                    <Navbar />
                    <Component {...pageProps} />
                </Web3ReactProvider>
            </ContractsContextProvider>
        </UserContextProvider>

        <Footer />
    </div>
  );
}

export default App;
