import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from "@web3-react/injected-connector";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import Router from 'next/router';
import styles from "./Login.module.css";
const ModelViewer = require('@metamask/logo');
import Head from 'next/head';

const injected = new InjectedConnector();

export default function LoginPage() {
    const { activate, active } = useWeb3React();
    const [loading, setLoading] = useState(true);
    const [hasMetamask, setHasMetamask] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (typeof window.ethereum !== "undefined") {
                setHasMetamask(true);
                loadMetamaskIcon();
            }
        }
        setLoading(false);
    }, [loading]);

    const loadMetamaskIcon = () => {
        const viewer = ModelViewer({
            // Dictates whether width & height are px or multiplied
            pxNotRatio: true,
            width: 50,
            height: 50,
            // pxNotRatio: false,
            // width: 0.9,
            // height: 0.9,
            
            // To make the face follow the mouse.
            followMouse: false,
            
            // head should slowly drift (overrides lookAt)
            slowDrift: false,
        });
        
        // add viewer to DOM
        const container = document.getElementById('logo-container');
        container && container.appendChild(viewer.container);

        // look at something on the page
        viewer.lookAt({
            x: 100,
            y: 100,
        });

        // enable mouse follow
        viewer.setFollowMouse(true);

        // deallocate nicely
        viewer.stopAnimation();
    }

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
                <div className={`card ${styles.shadow} ${styles.round} ${styles['top-margin']}`}>
                    <div className={`card-body ${styles.padding} ${styles.center}`}>
                        <div id="logo-container"/>
                        {
                            hasMetamask ? (
                                active ? (
                                    "Connected"
                                ) : (
                                    <>
                                    
                                        <h5 className="card-title"> Login with MetaMask</h5>
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