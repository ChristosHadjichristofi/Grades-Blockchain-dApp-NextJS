import { BigNumber } from "ethers";
import { useEffect, useContext, useState } from "react";
import ContractsContext from "../../../store/contract-context";
import styles from './VoteList.module.css';
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WithAuth from "../../../components/WithAuth/WithAuth";
import Router from "next/router";
import toast from "react-hot-toast";
import Head from 'next/head';

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
            Router.push('/show/vote-list');
            toast.success('Your vote for user with Wallet:\n' + address + '\nhas been submitted.', {
                style: {
                    maxWidth: 500
                }
            });
        })
        .catch(err => {
            Router.push('/show/vote-list');
            toast.error(err.data.message);
        })
    }

    useEffect(() => {
        if (!loading) {
            let voteList = [];

            contractsCtx.contracts["Grades"]
            .voteList()
            .then(voteListRetrieved => {

                if (voteListRetrieved.length == 0) {
                    Router.replace("/menu");
                    toast("No information found!");
                }

                for (const l of voteListRetrieved) {
                    voteList.push({ 
                        address: l.user, 
                        yes: BigNumber.from(l.yes).toNumber(), 
                        no: BigNumber.from(l.no).toNumber() 
                    });
                }
                setVoteList(voteList);
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
                <title>Show Vote-List Page</title>
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
        </>
    );
}

export default WithAuth(ShowVoteListPage);