import React, { useState } from 'react';
import toast from 'react-hot-toast';
import DiffModal from '../DiffModal/DiffModal';
import styles from "./Accordion.module.css";

const Accordion = ({ title, content, courseInfo }) => {
    const [isActive, setIsActive] = useState(false);
    const [show, setShow] = useState(false);
    const [diff, setDiff] = useState("");
    const [blockchainContent, setBlockchainContent] = useState("");
    const [urlContent, setUrlContent] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    const toggleDiffModal = () => setShow(!show);

    function showDiff(e) {
        // to stop accordion change state when clicking on Validate button
        e.stopPropagation();

        const info = JSON.parse(courseInfo);
        const course = info.course;
        const belongs = info.period + " - " + info.examDate;
        const school = info.school;

        const diffCreateEndpoint = '/api/diff/create';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { 
                    grades_asset_url: info.grades_asset_url, 
                    grades_asset_content_base64: info.grades_asset_content 
                }
            )
        };

        const diffCheck = fetch(diffCreateEndpoint, options)
        .then(response => response.text())
        .then(data => {
            let resData = JSON.parse(data);
            
            if (!resData.error) toast.success("The file located at the URL has not been changed!");
            else {
                setDiff(resData.diff);
                setBlockchainContent(resData.blockchainContent);
                setUrlContent(resData.urlContent);
                setShow(true);
                setModalTitle(`${course} ${belongs} ${school}`);
            }
        })

        toast.promise(diffCheck, {
            loading: 'Checking for diffs...',
            success: "Successfully checked for diffs!",
            error:   "Something went wrong!"
        })
    }

    return (
        <>
            { diff && <DiffModal diff={diff} show={show} toggleDiffModal={toggleDiffModal} modalTitle={modalTitle} blockchainContent={blockchainContent} urlContent={urlContent}></DiffModal> }
            <div className={`${styles['accordion']} ${styles.shadow} ${isActive && styles.active}`} onClick={() => setIsActive(!isActive)}>
                <div className={styles['space-between']}>
                    <button className={`btn btn-primary ${styles['validate-btn']} ${styles.shadow}`} onClick={showDiff}>
                        Validate
                    </button>
                    
                    <div>{title}</div>
                    <div>{isActive ? '-' : '+'}</div>
                </div>
            </div>
            {isActive && <div className={styles['accordion-content']}>{content}</div>}
        </>
    );
};

export default Accordion;