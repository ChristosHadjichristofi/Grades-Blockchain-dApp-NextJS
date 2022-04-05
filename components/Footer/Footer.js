import { faFileText, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.css';
import Link from "next/link";

const Footer = () => {
    return (
        <footer id="footer" className={styles['footer-basic']}>
            <ul className="list-inline">
                <li className="list-inline-item">
                    <Link href="/about">
                        <a><FontAwesomeIcon icon={ faInfoCircle }/>&nbsp;About</a>
                    </Link>
                </li>
                <li className="list-inline-item">
                    <a href="/">
                        <FontAwesomeIcon icon={ faFileText }/>&nbsp;Project Documentation
                    </a>
                </li>
                <li className="list-inline-item">
                    <a href="https://github.com/ChristosHadjichristofi/Grades-Blockchain-App-NextJS">
                        <FontAwesomeIcon icon={ faGithub }/>&nbsp;Github
                    </a>
                </li>
            </ul>
            <p className={styles.copyright}>Grades System dApp</p>
        </footer>
    );
}

export default Footer;