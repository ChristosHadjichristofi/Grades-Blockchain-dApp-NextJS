import { BigNumber } from "ethers";
import { useEffect, useContext, useState } from "react";
import ContractsContext from "../../../store/contract-context";
import styles from './VoteList.module.css';
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WithAuth from "../../../components/WithAuth/WithAuth";

function ShowVoteListPage() {

    const contractsCtx = useContext(ContractsContext);
    const [loading, setLoading] = useState(true);
    const [voteList, setVoteList] = useState([]);

    function voteYes(address) { submitVote(address, true); }
    function voteNo(address) { submitVote(address, false); }

    function submitVote(address, vote) {
        contractsCtx.contracts["Grades"]
        .voteAdd(address, vote)
        .then(result => {
            // req.flash('messages', { type: 'success', value: 'Your vote for user with Wallet ' + address + ' has been submitted.'})
            // res.redirect('/show/vote-list');
        })
        .catch(err => {
            // req.flash('messages', { type: 'error', value: err.toString() })
            // res.redirect('/show/vote-list');
        })
    }

    useEffect(() => {
        if (!loading) {
            let voteList = [];

            contractsCtx.contracts["Grades"]
            .voteList()
            .then(voteListRetrieved => {
                console.log(voteListRetrieved)
                if (voteListRetrieved.length == 0) {
                    // req.flash('messages', { type: 'error', value: "No information found!" })
                    // return res.redirect('/menu');
                }

                for (const l of voteListRetrieved) {
                    voteList.push({ 
                        address: l.node, 
                        yes: BigNumber.from(l.yes).toNumber(), 
                        no: BigNumber.from(l.no).toNumber() 
                    });
                }
                setVoteList(voteList);
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
                                            <th># Accepted</th>
                                            <th># Rejected</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {voteList.map(vote => {
                                            return (
                                            <tr key={vote.address}>
                                                <td>{vote.address}</td>
                                                <td>{vote.yes}</td>
                                                <td>{vote.no}</td>
                                                <td>
                                                    <div className={`${styles.pointer} ${styles['green-color']}`} onClick={() => {voteYes(vote.address)}}>
                                                        <FontAwesomeIcon icon={ faCheck }/>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={`${styles.pointer} ${styles['red-color']}`} onClick={() => {voteNo(vote.address)}}>
                                                        <FontAwesomeIcon icon={ faBan }/>
                                                    </div>
                                                </td>
                                            </tr>
                                            );
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

export default WithAuth(ShowVoteListPage);