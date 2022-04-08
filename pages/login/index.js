import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from "@web3-react/injected-connector";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import Router from 'next/router';
import styles from "./Login.module.css";
import Head from 'next/head';

const injected = new InjectedConnector();

export default function LoginPage() {
    const { activate, active } = useWeb3React();
    const [hasMetamask, setHasMetamask] = useState(false);

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setHasMetamask(true);
        }
    }, []);

    async function connect() {
        if (typeof window.ethereum !== "undefined") {
            try {
                let rejected = false;
                
                setHasMetamask(true);
                await activate(injected, (e) => rejected = true );
                
                !rejected && toast.success("Successfully logged in!");
                Router.push('/menu');
            } catch (e) {
                toast.error("Something went wrong!");
            }
        }
    }

    return (
        <>
            <Head>
                <title>Login Page</title>
                <meta property="og:title" key="title" />
            </Head>

            <div className="col d-flex justify-content-center">
                <div className={`card ${styles.shadow} ${styles['top-margin']}`}>
                    <div className={`card-body ${styles.padding} ${styles.center}`}>
                        {
                            hasMetamask ? (
                                active ? (
                                    "Connected"
                                ) : (
                                    <>
                                        <h5 className="card-title"><img className={styles['metamask-icon']} src='/images/metamask_logo.png' /> Login with MetaMask</h5>
                                        <hr/>
                                        <p className="card-text">Login with your MetaMask account to Grades System</p>
                                        <button className={`btn btn-primary ${styles.shadow}`} onClick={connect}>Login</button>
                                    </>
                                )
                            ) : (
                                "Please Install metamask"
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}