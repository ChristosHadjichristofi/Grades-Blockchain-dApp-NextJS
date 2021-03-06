import { useEffect, useContext, useState } from "react";
import ContractsContext from "../../../store/contract-context";
import styles from './Participants.module.css';
import WithAuth from "../../../components/WithAuth/WithAuth";
import Router from "next/router";
import toast from "react-hot-toast";
import Head from 'next/head';

function ShowParticipantsPage() {

    const contractsCtx = useContext(ContractsContext);
    const [loading, setLoading] = useState(true);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        if (!loading) {
            let participants = [];

            contractsCtx.contracts["Grades"]
            .retrieveParticipants()
            .then(participantsRetrieved => {

                if (participantsRetrieved.length == 0) {
                    Router.replace("/menu");
                    toast("No information found!");
                }

                for (const p of participantsRetrieved) {
                    participants.push({ hasAccess: p.hasAccess, isMaster: p.isMaster, school: p.school, wallet: p.addr });
                }
                setParticipants(participants);
            })
            .catch(err => {
                Router.replace("/menu");
                toast.error(err.data.message);
            })
        }

        setLoading(false);
    }, [loading]);

    return (
        <>
            <Head>
                <title>Show Participants Page</title>
                <meta property="og:title" key="title" />
            </Head>

            <div className="container">
                <div className={`row ${styles['row-margin']}`}>
                    <div className="col-md-12">
                        <div className={`card ${styles['card-container']} ${styles.shadow}`}>
                            <div className={`card-body ${styles['card-center']}`}>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Wallet</th>
                                                <th>Has Access</th>
                                                <th>Master User</th>
                                                <th>Belongs</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {participants.map(participant => {
                                                return (
                                                <tr key={participant.wallet}>
                                                    <td>{participant.wallet}</td>
                                                    <td>{participant.hasAccess ? 'Yes' : 'No'}</td>
                                                    <td>{participant.isMaster ? 'Yes' : 'No'}</td>
                                                    <td>{participant.school}</td>
                                                </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WithAuth(ShowParticipantsPage);