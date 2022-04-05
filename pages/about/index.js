import React from 'react';
import styles from "./About.module.css";
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

function AboutPage() {
    return (

        <div className="col d-flex justify-content-center">
            <div className={styles.row} style={{ marginTop: 2.5 + 'rem' }}>
                <div className={`${styles.animated} ${styles.fadeIn}`}>
                    <div className={styles.card}>
                        <div className={`card-body`}>
                            <div className={`${styles.center} ${styles.avatar}`}>
                                <img
                                    src="https://eu.ui-avatars.com/api/CH"
                                    className={styles['card-img-top']}
                                    alt=""
                                />
                                <h5 className={`${styles['card-title']}`}>
                                    Christos Hadjichristofi
                                </h5>
                            </div>
                            <hr />
                            <h6>Project Information</h6>
                            <p className={`${styles.center} ${styles['card-text']}`}>
                                Should add info about the project (or a ref to it)
                                <br />
                            </p>
                            <h6>About me</h6>
                            <p className={`${styles.center} ${styles['card-text']}`}>
                                More information about me can be found in <a href='https://christoshadjichristofi.github.io/'>here</a>
                                <br />
                            </p>
                            <h6>Find me on</h6>
                            <div className={`${styles.center} ${styles['social-basic']}`}>
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                        <Link href="https://www.linkedin.com/in/ChristosHadjichristofi/">
                                            <a><FontAwesomeIcon icon={faLinkedin} />&nbsp;LinkedIn</a>
                                        </Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="https://github.com/ChristosHadjichristofi"><FontAwesomeIcon icon={faGithub} />&nbsp;GitHub</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutPage