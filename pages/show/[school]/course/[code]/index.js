import { useEffect, useContext, useState } from "react";
import ContractsContext from "../../../../../store/contract-context";
import Accordion from "../../../../../components/Accordion/Accordion";
import styles from './CourseByID.module.css';
import Router from "next/router";
import Link from 'next/link';
const moment = require('moment');

export default function ShowCourseDetails({ courseInfo, setCourseInfo }) {

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
                        // req.flash('messages', { type: 'error', value: "No information found!" })
                        // return res.redirect('/courses');
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
                    // req.flash('messages', { type: 'error', value: err.toString() })
                    // res.redirect('/courses');
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
                            <div key={key}>
                                <Accordion title={key}  courseInfo={JSON.stringify(value[value.length - 1])} content={
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th># Participants</th>
                                                    <th># Participants Passed</th>
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
