import Card from "../../components/Card/Card";
import styles from "./Menu.module.css";
import Router from "next/router";
import { useWeb3React } from "@web3-react/core";
import { useContext, useState, useEffect } from 'react';
import { abi } from "../../constants/abi";
import { ethers } from "ethers";
import ContractsContext from "../../store/contract-context";
import UserContext from "../../store/user-context";

export default function MenuPage() {

    const [user, setUser] = useState({});
    const contractsCtx = useContext(ContractsContext);
    const userCtx = useContext(UserContext);
    const {
        activate,
        active,
        chainId,
        account,
        library: provider,
    } = useWeb3React();

    useEffect(() => {
        async function a() {
            if (active) {
                const signer = provider.getSigner();
                const contractAddress = "0xd298b029aA37F7B08bF1F15bf7b210C8bE1C392a";
                const contract = new ethers.Contract(contractAddress, abi, signer);

                contractsCtx.addContract("Grades", contract);
                try {
                    contract.retrieveNodePermissions(account)
                        .then(u => {
                            setUser(u);
                            userCtx.addUser(u);
                        })
                } catch (e) {
                    console.log(e);
                }
            }
            else {
                Router.push("/");
            }
        }
        a();
    }, []);

    return (
        // should only appear if loggedIn (metamask)
        <>
            {user.hasAccess ? (
                <div className={`container ${styles["row-container"]}`}>
                    <div className={`row ${styles["row-margin"]}`}>
                        <Card
                            title="Form Completion"
                            details="Add new Grades Information for a specific course to the Blockchain"
                            route="/form/add/grades-info"
                        />
                        <Card
                            title="Show Courses"
                            details="List of all school courses. In this page you can see all Grades Information regarding a course"
                            route="/show/courses"
                        />
                        <Card
                            title="Vote List"
                            details="List of all nodes that applied to be a part of the network. Each participant can vote"
                            route="/show/vote-list"
                        />
                    </div>
                </div>
            ) : null}

            {user.isMaster && user.hasAccess ? (
                <div className={`container ${styles["row-container"]}`}>
                    <div className={`row ${styles["row-margin"]}`}>
                        <Card
                            title="Add Node"
                            details="Give access to a new node. You must be a master node to be able to add a new node"
                            route="/form/add/node"
                        />
                        <Card
                            title="Show Participants"
                            details="See all participant nodes. Only a master node is able to see the regarding information"
                            route="/show/participants"
                        />
                    </div>
                </div>
            ) : null}
        </>
    );
}
