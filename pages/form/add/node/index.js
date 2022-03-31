import { schools } from "../../../../constants/schools-info";
import styles from './NodeForm.module.css';

export default function AddNodeFormPage() {
  return (
    <div>
      <div className={`container ${styles["container-form"]}`}>
        <div className="card">
          <div className="card-body">
            <h6 className="text-muted card-subtitle mb-2">Complete the following form</h6>

            <form method="POST" action="/api/add/node/permissions">
              <label htmlFor="wallet">Node Wallet</label>
              <input className="form-control" type="text" name="wallet" id="wallet"/>

              <label htmlFor="schools">School</label>
              <select className="form-control" id="schools" name="school">
                {schools.map((school) => {
                  return <option value={school}>{school}</option>;
                })}
              </select>

              <label htmlFor="master">Master Node</label>
              <select className="form-control" id="master" name="master">
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>

              <div className={styles["btn-container"]}>
                <button className={`btn btn-primary ${styles["btn-space"]}`} type="submit">Save</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
