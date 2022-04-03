import React, { useState } from 'react';
import styles from "./Accordion.module.css";

const Accordion = ({ title, content, setCourseInfo }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <div className={`${styles['accordion']} ${isActive && styles.active}`} onClick={() => setIsActive(!isActive)}>
                <div className={styles['space-between']}>
                    <button className={`btn btn-primary ${styles['validate-btn']}`} onClick={() => setCourseInfo}>
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