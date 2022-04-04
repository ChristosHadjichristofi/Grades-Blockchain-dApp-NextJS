import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from "@web3-react/injected-connector";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import Router from 'next/router';

const injected = new InjectedConnector();

export default function HomePage() {
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
                await activate(injected);
                setHasMetamask(true);
                toast.success('Authentication successful!');
                Router.push('/menu');
            } catch (e) {
                toast.error("Something went wrong!");
            }
        }
    }

    return (
        <div className="col d-flex justify-content-center">
            <div className="card" style={{ marginTop: 8 + 'rem' }}>
                <div className="card-body" style={{ paddingRight: 30 + 'px', paddingLeft: 30 + 'px', textAlign: 'center' }}>
                    {
                        hasMetamask ? (
                            active ? (
                                "Connected"
                            ) : (
                                <>
                                    <h5 className="card-title">Login with MetaMask</h5>
                                    <p className="card-text">Login with your MetaMask account to Grades System</p>
                                    <button className="btn btn-primary" onClick={connect}>Login</button>
                                </>
                            )
                        ) : (
                            "Please Install metamask"
                        )
                    }
                </div>
            </div>
        </div>
    )
}