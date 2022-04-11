import Card from "../../components/Card/Card";
import styles from "./Menu.module.css";
import { useWeb3React } from "@web3-react/core";
import { useContext, useState, useEffect } from 'react';
import { abi } from "../../constants/abi";
import { contracts } from "../../constants/contracts-addresses";
import { ethers } from "ethers";
import ContractsContext from "../../store/contract-context";
import UserContext from "../../store/user-context";
import WithAuth from "../../components/WithAuth/WithAuth";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import Head from 'next/head';

function MenuPage() {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const contractsCtx = useContext(ContractsContext);
    const userCtx = useContext(UserContext);
    const { account, library: provider } = useWeb3React();

    useEffect(() => {
        function setCtxs() {
            const signer = provider.getSigner();
            const contractAddress = contracts["Grades"];
            const contract = new ethers.Contract(contractAddress, abi, signer);
            contractsCtx.addContract("Grades", contract);
            contract.retrieveNodePermissions(account)
            .then(u => {
                setUser(u);
                userCtx.addUser(u);
                setLoading(false);
            })
            .catch((err) => toast.error(err.data.message));
        }
        
        setCtxs();
        
    }, []);

    return (
        <>
            <Head>
                <title>Menu Page</title>
                <meta property="og:title" key="title" />
            </Head>

            {user.hasAccess ? (
                <div className={`container ${styles["row-container"]}`}>
                    <div className={`row ${styles["row-margin"]}`}>
                        <Card
                            title="Form Completion"
                            details="Add grades information for a specific school's course of an exam period to the Blockchain"
                            route="/form/add/grades-info"
                        />
                        <Card
                            title="Show Courses"
                            details="List of all school courses. In this page you can see all Grades Information regarding a course"
                            route="/show/courses"
                        />
                        <Card
                            title="Vote List"
                            details="List of all users that applied to be a part of the network. Each participant can vote"
                            route="/show/vote-list"
                        />
                    </div>
                </div>
            ) : !loading && (
                <div className={`container col-md-2`}>
                    <div className={`row ${styles["row-margin"]}`}>
                        <div className={`card ${styles.center}`}>
                            <h4><FontAwesomeIcon icon={ faWarning } className={styles.warning}/> Invalid Access</h4>
                            <hr/>
                            <div className="card-body" >
                                You have to be voted to participate and perform actions.
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {user.isMaster && user.hasAccess ? (
                <div className={`container ${styles["row-container"]}`}>
                    <div className={`row ${styles["row-margin"]}`}>
                        <Card
                            title="Add User"
                            details="Give access to a new user. You must be a master user to be able to add a new user"
                            route="/form/add/user"
                        />
                        <Card
                            title="Show Participants"
                            details="See all participant users. Only a master user is able to see the regarding information"
                            route="/show/participants"
                        />
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default WithAuth(MenuPage);