import Link from 'next/link';
import { useWeb3React } from "@web3-react/core";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const { active } = useWeb3React();
    
    return (
        <nav className={`navbar navbar-expand-lg bg-primary navbar-dark ${styles['nav-bar-container']} ${styles.shadow}`}>
            <div>
                <a className="navbar-brand"><img className={`${styles.icon} ${styles['icon-round-background']}`} src="/images/ntua_logo.png" /> ECE NTUA @ Softlab</a>
            </div>

            <ul className="navbar-nav">
                {!active && 
                <li className="nav-item">
                    <Link href="/">
                        <a className="nav-link"><FontAwesomeIcon icon={ faSignIn }/>&nbsp;Login</a>
                    </Link>
                </li>}

                {active &&
                <li className="nav-item">
                    <Link href="/menu">
                        <a className="nav-link"><FontAwesomeIcon icon={ faBars }/>&nbsp;Menu</a>
                    </Link>
                </li>
                }                
            </ul>

        </nav>
    );
}

export default Navbar;