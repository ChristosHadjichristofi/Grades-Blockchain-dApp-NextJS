import { schools } from "../../../../constants/schools-info";
import styles from './NodeForm.module.css';
import ContractsContext from "../../../../store/contract-context";
import { useContext, useRef } from 'react';
import Router from 'next/router';
import WithAuth from "../../../../components/WithAuth/WithAuth";
import toast from "react-hot-toast";

function AddNodeFormPage() {

    const contractsCtx = useContext(ContractsContext);

    const walletInput = useRef();
    const schoolInput = useRef();
    const isMasterInput = useRef();

    function submitHandler(e) {
        e.preventDefault();

        const wallet = walletInput.current.value;
        const school = schoolInput.current.value;
        const isMaster = isMasterInput.current.value == 'Yes' ? true : false;

        const validationEndPoint = '/api/form/node/validation';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ wallet: wallet, school: school, isMaster: isMaster })
        };

        fetch(validationEndPoint, options)
        .then(response => response.text())
        .then(data => {
            let resData = JSON.parse(data);
            if (resData.error) toast.error(resData.msg);
            else {
                contractsCtx.contracts["Grades"]
                .addNetworkNode(
                    wallet,
                    school,
                    isMaster
                )
                .then(() => toast.success('User with Wallet: ' + wallet + " was added successfully to the vote list!"))
                .catch(err => toast.error(err.data.message))
            }

        })
        .then(() => Router.push('/form/add/node'));
    }

    return (
        <div>
            <div className={`container ${styles["container-form"]}`}>
                <div className="card">
                    <div className="card-body">
                        <h6 className="text-muted card-subtitle mb-2">Complete the following form</h6>

                        <form onSubmit={submitHandler}>
                            <label htmlFor="wallet">Node Wallet</label>
                            <input className="form-control" type="text" name="wallet" id="wallet" ref={walletInput} />

                            <label htmlFor="schools">School</label>
                            <select className="form-control" id="schools" name="school" ref={schoolInput}>
                                {schools.map((school) => {
                                    return <option key={school} value={school}>{school}</option>;
                                })}
                            </select>

                            <label htmlFor="master">Master Node</label>
                            <select className="form-control" id="master" name="master" ref={isMasterInput}>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>


                            <div className={styles["btn-container"]}>
                                <button className={`btn btn-primary ${styles["btn-space"]}`}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WithAuth(AddNodeFormPage);