import { faFileText, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer id="footer" className={styles['footer-basic']}>
            <ul className="list-inline">
                <li className="list-inline-item">
                    <a href="/">
                        <FontAwesomeIcon icon={ faInfoCircle }/>&nbsp;About
                    </a>
                </li>
                <li className="list-inline-item">
                    <a href="/">
                        <FontAwesomeIcon icon={ faFileText }/>&nbsp;Project Documentation
                    </a>
                </li>
                <li className="list-inline-item">
                    <a href="https://github.com/ChristosHadjichristofi/Grades-Blockchain-App">
                        <FontAwesomeIcon icon={ faGithub }/>&nbsp;Github
                    </a>
                </li>
            </ul>
            <p className={styles.copyright}>Grades System App</p>
        </footer>
    );
}

export default Footer;