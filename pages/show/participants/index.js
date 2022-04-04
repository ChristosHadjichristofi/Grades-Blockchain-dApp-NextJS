import { useEffect, useContext, useState } from "react";
import ContractsContext from "../../../store/contract-context";
import styles from './Participants.module.css';
import WithAuth from "../../../components/WithAuth/WithAuth";

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
                    // req.flash('messages', { type: 'error', value: "No information found!" })
                    // return res.redirect('/menu');
                }

                for (const p of participantsRetrieved) {
                    participants.push({ hasAccess: p.hasAccess, isMaster: p.isMaster, school: p.school, wallet: p.addr });
                }
                setParticipants(participants);
            })
            .catch(err => {
                // req.flash('messages', { type: 'error', value: err.toString() })
                // res.redirect('/menu');
            })
        }

        setLoading(false);
    }, [loading]);

    return (
        <div className="container">
            <div className={`row ${styles['row-margin']}`}>
                <div className="col-md-12">
                    <div className={`card ${styles['card-container']}`}>
                        <div className={`card-body ${styles['card-center']}`}>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Wallet</th>
                                            <th>Has Access</th>
                                            <th>Master Node</th>
                                            <th>School</th>
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
    );
}

export default WithAuth(ShowParticipantsPage);