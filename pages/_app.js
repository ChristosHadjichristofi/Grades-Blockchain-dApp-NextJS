import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import { ContractsContextProvider } from '../store/contract-context';

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { UserContextProvider } from "../store/user-context";

const getLibrary = (provider) => {
    return new Web3Provider(provider);
};

function App({ Component, pageProps }) {
    return (
    <>
    <Navbar />

    <UserContextProvider>
        <ContractsContextProvider>
            <Web3ReactProvider getLibrary={getLibrary}>
                <Component {...pageProps} />
            </Web3ReactProvider>
        </ContractsContextProvider>
    </UserContextProvider>

    <Footer />
    </>
  );
}

export default App;
