import { schools, courses } from "../../../constants/schools-info";
import styles from './Courses.module.css';
import { useContext, useState, useEffect } from 'react';
import UserContext from "../../../store/user-context";
import Link from 'next/link';
import WithAuth from "../../../components/WithAuth/WithAuth";
import toast from "react-hot-toast";
import Head from 'next/head';

function ShowCourses() {

    const userCtx = useContext(UserContext);
    const [schoolsArray, setSchoolsArray] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            setSchoolsArray(userCtx.user.isMaster ? schools : [userCtx.user.school]);
            toast.success("Courses successfully loaded!");
        }
        setLoading(false);
    }, [loading]);

    return (
        <>
            <Head>
                <title>Show Courses Page</title>
                <meta property="og:title" key="title" />
            </Head>

            <div>
                {schoolsArray.map((school) => {
                    return (
                    <div className="container" key={school}>
                        <div className={`row ${styles["row-margin"]}`}>
                            <div className="col-md-12">
                                <div className={`card ${styles["card-container"]} ${styles.shadow}`}>
                                    <div className={`card-body ${styles["card-center"]}`}>
                                        <h2> {school} </h2>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th> Course Code </th>
                                                        <th> Course Name </th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {courses[school].map((course) => {
                                                        return (
                                                        <tr key={course.id}>
                                                            <td>{course.id}</td>
                                                            <td>{course.name}</td>
                                                            <td>
                                                                <Link href={{
                                                                    pathname: '/show/[school]/course/[code]',
                                                                    query: {
                                                                        school: school,
                                                                        code: course.id
                                                                    }
                                                                }}>
                                                                    <button className={`btn btn-primary ${styles.shadow}`}>More</button>
                                                                </Link>
                                                            </td>
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
                    )
                })}
            </div>
        </>
    );
}

export default WithAuth(ShowCourses);