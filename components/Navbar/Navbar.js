import Link from 'next/link';
import { useWeb3React } from "@web3-react/core";
import styles from "./Navbar.module.css";

const Navbar = () => {
    const { active } = useWeb3React();
    return (
        <nav className={`navbar navbar-expand-lg bg-primary navbar-dark ${styles['nav-bar-container']}`}>
            {active && <Link href="/menu"><a className="navbar-brand">Grades System</a></Link>}

            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link">
                        <img className={`${styles.icon} ${styles['icon-round-background']}`} src="/images/ntua_logo.png" /> ECE NTUA @ Softlab</a>
                </li>
            </ul>

        </nav>
    );
}

export default Navbar;