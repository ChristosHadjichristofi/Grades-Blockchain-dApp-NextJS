import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const getLibrary = (provider) => {
  return new Web3Provider(provider);
}

function App({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={ getLibrary }>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default App
