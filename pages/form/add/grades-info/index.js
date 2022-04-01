import styles from './GradesInfoForm.module.css';
import { useState, useContext, useRef } from "react";
import { schools, courses } from "../../../../constants/schools-info";
import UserContext from "../../../../store/user-context";

export default function AddGradeDetailsFormPage() {

    const userCtx = useContext(UserContext);
    const [selectedSchool, setSelectedSchool] = useState(userCtx.user.isMaster ? "SCHOOL OF CIVIL ENGINEERING" : userCtx.user.school);

    const schoolInput = useRef();
    const periodInput = useRef();
    const courseInput = useRef();
    const profInput = useRef();
    const examDateInput = useRef();
    const participantsInput = useRef();
    const passedInput = useRef();
    const gradesAssetInput = useRef();
    const updateStatusInput = useRef();
    const notesRef = useRef();
    const gradesFileRef = useRef();

    function submitHandler(e) {
        e.preventDefault();


    }

    function optionChanged(e) {
        setSelectedSchool(e.target.value);
    }

    return (
        <div className={`container ${styles["container-form"]}`}>
            <div className="card">
                <div className="card-body">
                    <h6 className="text-muted card-subtitle mb-2">Complete the following form</h6>
                    <form encType="multipart/form-data" onSubmit={submitHandler}>
                        <label htmlFor="schools">School</label>
                        {(userCtx.user.isMaster) ?
                            <select className="form-control" id="schools" name="school" onChange={optionChanged}>
                                {schools.map((school) => {
                                    return <option key={school} value={school}>{school}</option>;
                                })}
                            </select>
                            :
                            <select className="form-control" id="schools" name="school">
                                <option value={userCtx.user.school}>{userCtx.user.school}</option>
                            </select>
                        }

                        <label htmlFor="period">Period</label>
                        <select className="form-control" id="period" name="period">
                            <option value="WINTER">WINTER</option>
                            <option value="SUMMER">SUMMER</option>
                            <option value="AUTUMN">AUTUMN</option>
                        </select>

                        <label htmlFor="course">Course</label>
                        <select className="form-control" name="course" id="courses">
                            {courses[selectedSchool].map((course) => {
                                return <option key={course.id} value={course.id}>{course.name + ' - ' + course.id}</option>;
                            })}
                        </select>

                        <label htmlFor="professor">Professor</label>
                        <input className="form-control" name="professor" id="professor" />

                        <label htmlFor="exam-date">Exam Date</label>
                        <input className="form-control" type="datetime-local" name="exam_date" id="exam-date" />

                        <label htmlFor="participants-no">Number of Participants</label>
                        <input className="form-control" type="number" name="participants_no" id="participants-no" />

                        <label htmlFor="pass-no">Number of Participants Passed</label>
                        <input className="form-control" type="number" name="pass_no" id="pass-no" />

                        <label htmlFor="grades-asset-url">Grades Asset</label>
                        <input className="form-control" type="url" name="grades_asset_url" id="grades-asset-url" />

                        <label htmlFor="update-status">Update Status</label>
                        <select className="form-control" id="update_status" name="update_status">
                            <option value="INITIAL STATE">INITIAL STATE</option>
                            <option value="CORRECTIVE STATE">CORRECTIVE STATE</option>
                        </select>

                        <label htmlFor="notes">Notes</label>
                        <textarea className="form-control" name="notes" id="notes"></textarea>

                        <label>Grades File (.bau)</label>
                        <div>
                            <input type="file" name="grades_file" accept=".bau" />
                        </div>

                        <div className={styles["btn-container"]}>
                            <button className={`btn btn-primary ${styles["storeGrades"]}`}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
