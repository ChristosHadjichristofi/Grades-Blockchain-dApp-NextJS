import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from "react";
import Router from 'next/router';
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";

export default function Menu() {
    const { activate, active, chainId, account, library: provider } = useWeb3React();
    const [user, setUser] = useState({});

    function checkIfLoggedIn() {
        if (!active) Router.push('/');
    }

    checkIfLoggedIn();

    return (
        <div>
            <Navbar/>

            <div className="container" id="container-form">
                <div className="card">
                    <div className="card-body">
                        <h6 className="text-muted card-subtitle mb-2">Complete the following form</h6>
                        <form method="POST" action="/api/add/node/permissions">
                            <label htmlFor="wallet">Node Wallet</label>
                            <input className="form-control" type="text" name="wallet" id="wallet"/>

                            <label htmlFor="schools">School</label>
                            <select className="form-control" id="schools" name="school">
                                <option value="SCHOOL OF CIVIL ENGINEERING">SCHOOL OF CIVIL ENGINEERING</option>
                                <option value="SCHOOL OF MECHANICAL ENGINEERING">SCHOOL OF MECHANICAL ENGINEERING</option>
                                <option value="SCHOOL OF ELECTRICAL & COMPUTER ENGINEERING">SCHOOL OF ELECTRICAL & COMPUTER ENGINEERING</option>
                                <option value="SCHOOL OF ARCHITECTURE">SCHOOL OF ARCHITECTURE</option>
                                <option value="SCHOOL OF CHEMICAL ENGINEERING">SCHOOL OF CHEMICAL ENGINEERING</option>
                                <option value="SCHOOL OF RURAL, SURVEYING AND GEOINFORMATICS ENGINEERING">SCHOOL OF RURAL, SURVEYING AND GEOINFORMATICS ENGINEERING</option>
                                <option value="SCHOOL OF MINING & METALLURGICAL ENGINEERING">SCHOOL OF MINING & METALLURGICAL ENGINEERING</option>
                                <option value="SCHOOL OF NAVAL ARCHITECTURE & MARINE ENGINEERING">SCHOOL OF NAVAL ARCHITECTURE & MARINE ENGINEERING</option>
                                <option value="SCHOOL OF APPLIED MATHEMATICAL & PHYSICAL SCIENCES">SCHOOL OF APPLIED MATHEMATICAL & PHYSICAL SCIENCES</option>
                            </select>
                            
                            <label htmlFor="master">Master Node</label>
                            <select className="form-control" id="master" name="master">
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>

                            <div id="btn-container">
                                <button className="btn btn-primary" id="storeNodePermissions" type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );

}