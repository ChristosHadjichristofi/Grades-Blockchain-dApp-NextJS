import { useEffect, useContext, useState } from "react";
import ContractsContext from "../../../../../store/contract-context";
import Accordion from "../../../../../components/Accordion/Accordion";
import styles from './CourseByID.module.css';
import Router from "next/router";
import WithAuth from "../../../../../components/WithAuth/WithAuth";
import toast from "react-hot-toast";
const moment = require('moment');

function ShowCourseDetails({ courseInfo, setCourseInfo }) {

    const { school, code } = Router.query;
    const contractsCtx = useContext(ContractsContext);

    const [coursesData, setCoursesData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            let retrievedCourseData = {};

            contractsCtx.contracts["Grades"]
            .retrieveCourseGrades(code, school)
            .then(JSON_StringArr => {

                if (JSON_StringArr.length == 0) {
                    toast.error("No information found!");
                    Router.replace('/courses');
                }

                for (const stringified of JSON_StringArr) {
                    let o = JSON.parse(stringified);
                    o.examDate = moment(o.examDate).format("DD/MM/YYYY hh:mm");

                    if (!retrievedCourseData.hasOwnProperty(o.period + " - " + o.examDate))
                        retrievedCourseData[o.period + " - " + o.examDate] = [];

                    retrievedCourseData[o.period + " - " + o.examDate].push(o);
                }
                setCoursesData(retrievedCourseData);
            })
            .catch(err => {
                toast.error(err.data.message);
                Router.replace('/courses');
            })
        }

        setLoading(false);
    }, [loading]);



    return (
        <>
        <h2 className={styles['title-center']}>{school + ' - Course ID: ' + code}</h2>
        <div className={`container ${styles.spacer}`}>
            {Object.entries(coursesData)
                .map(([key, value]) => {
                    return (
                        <div key={key} style={{ marginTop: 1 + 'rem' }}>
                            <Accordion title={key}  courseInfo={JSON.stringify(value[value.length - 1])} content={
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th># Participants</th>
                                                <th># Participants Passed</th>
                                                <th>Professor</th>
                                                {/* <th>Grades Asset URL</th> */}
                                                {/* <th>Grades Asset Hash</th> */}
                                                <th>Status</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {value.map((course, idx) => {
                                            return (
                                            <tr key={idx}>
                                                <td>{course.participants_number}</td>
                                                <td>{course.pass_number}</td>
                                                <td>{course.professor}</td>
                                                {/* <td>{course.grades_asset_url}</td> */}
                                                {/* <td>{course.grades_asset_hash}</td> */}
                                                <td>{course.update_status}</td>
                                                <td>{course.notes}</td>
                                            </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            } />
                        </div>
                    );
                })}
        </div>
        </>
    );
}

export default WithAuth(ShowCourseDetails);