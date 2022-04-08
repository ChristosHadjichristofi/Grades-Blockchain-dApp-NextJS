import styles from './GradesInfoForm.module.css';
import { useState, useContext, useRef } from "react";
import { schools, courses } from "../../../../constants/schools-info";
import UserContext from "../../../../store/user-context";
import FileImport from "../../../../components/FileInputReader/FileInputReader";
import crypto from 'crypto';
import ContractsContext from '../../../../store/contract-context';
import Router from 'next/router';
import WithAuth from "../../../../components/WithAuth/WithAuth";
import toast from 'react-hot-toast';
import Head from 'next/head';

function AddGradeDetailsFormPage() {

    const userCtx = useContext(UserContext);
    const contractsCtx = useContext(ContractsContext);
    const [selectedSchool, setSelectedSchool] = useState(userCtx.user.isMaster ? "SCHOOL OF CIVIL ENGINEERING" : userCtx.user.school);
    const [fileContent, setFileContent] = useState("");

    const sha256 = x => crypto.createHash('sha256').update(x, 'utf8').digest('hex');

    const schoolInput = useRef();
    const periodInput = useRef();
    const courseInput = useRef();
    const profInput = useRef();
    const examDateInput = useRef();
    const participantsInput = useRef();
    const passedInput = useRef();
    const gradesAssetInput = useRef();
    const updateStatusInput = useRef();
    const notesInput = useRef();

    function submitHandler(e) {
        e.preventDefault();

        const gradeInfo = {
            school: schoolInput.current.value,
            year: new Date(examDateInput.current.value).getFullYear(),
            period: periodInput.current.value,
            course: courseInput.current.value,
            professor: profInput.current.value,
            examDate: examDateInput.current.value,
            participants_number: participantsInput.current.value,
            pass_number: passedInput.current.value,
            grades_asset_url: gradesAssetInput.current.value,
            grades_asset_hash: fileContent ? sha256(fileContent) : null,
            grades_asset_content: Buffer.from(fileContent).toString('base64'),
            update_status: updateStatusInput.current.value,
            notes: notesInput.current.value,
        };

        const validationEndPoint = '/api/form/grades-info/validation';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gradeInfo)
        };

        fetch(validationEndPoint, options)
        .then(response => response.text())
        .then(data => {
            let resData = JSON.parse(data);
            if (resData.error) toast.error(resData.msg);
            else {
                contractsCtx.contracts["Grades"]
                .addRecord(
                    schoolInput.current.value,
                    JSON.stringify(gradeInfo),
                    courseInput.current.value
                )
                .then(() => toast.success("The content of the form was submitted successfully!"))
                .catch(err => toast.error(err.data.message))
            }

        })
        .then(() => Router.push('/form/add/grades-info'));
    }

    function optionChanged(e) {
        setSelectedSchool(e.target.value);
    }

    return (
        <>
            <Head>
                <title>Add Grades Info Page</title>
                <meta property="og:title" key="title" />
            </Head>

            <div className={`container ${styles["container-form"]}`}>
                <div className={`card ${styles.shadow}`}>
                    <div className="card-body">
                        <h6 className="text-muted card-subtitle mb-2">Complete the following form</h6>
                        <form encType="multipart/form-data" onSubmit={submitHandler}>
                            <label htmlFor="schools">School</label>
                            {(userCtx.user.isMaster) ?
                                <select className="form-control" id="schools" name="school" onChange={optionChanged} ref={schoolInput}>
                                    {schools.map((school) => {
                                        return <option key={school} value={school}>{school}</option>;
                                    })}
                                </select>
                                :
                                <select className="form-control" id="schools" name="school" ref={schoolInput}>
                                    <option value={userCtx.user.school}>{userCtx.user.school}</option>
                                </select>
                            }

                            <label htmlFor="period">Period</label>
                            <select className="form-control" id="period" name="period" ref={periodInput}>
                                <option value="WINTER">WINTER</option>
                                <option value="SUMMER">SUMMER</option>
                                <option value="AUTUMN">AUTUMN</option>
                            </select>

                            <label htmlFor="course">Course</label>
                            <select className="form-control" name="course" id="courses" ref={courseInput}>
                                {courses[selectedSchool].map((course) => {
                                    return <option key={course.id} value={course.id}>{course.name + ' - ' + course.id}</option>;
                                })}
                            </select>

                            <label htmlFor="professor">Professor</label>
                            <input className="form-control" name="professor" id="professor" ref={profInput} />

                            <label htmlFor="exam-date">Exam Date</label>
                            <input className="form-control" type="datetime-local" name="exam_date" id="exam-date" ref={examDateInput} />

                            <label htmlFor="participants-no">Number of Participants</label>
                            <input className="form-control" type="number" name="participants_no" id="participants-no" ref={participantsInput} />

                            <label htmlFor="pass-no">Number of Participants Passed</label>
                            <input className="form-control" type="number" name="pass_no" id="pass-no" ref={passedInput} />

                            <label htmlFor="grades-asset-url">Grades Asset</label>
                            <input className="form-control" type="url" name="grades_asset_url" id="grades-asset-url" ref={gradesAssetInput} />

                            <label htmlFor="update-status">Update Status</label>
                            <select className="form-control" id="update_status" name="update_status" ref={updateStatusInput}>
                                <option value="INITIAL STATE">INITIAL STATE</option>
                                <option value="CORRECTIVE STATE">CORRECTIVE STATE</option>
                            </select>

                            <label htmlFor="notes">Notes</label>
                            <textarea className="form-control" name="notes" id="notes" ref={notesInput}></textarea>

                            <label>Grades File (.bau)</label>
                            <div>
                                <FileImport setFileContent={setFileContent} />
                            </div>

                            <div className={styles["btn-container"]}>
                                <button className={`btn btn-primary ${styles["storeGrades"]} ${styles.shadow}`}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WithAuth(AddGradeDetailsFormPage);