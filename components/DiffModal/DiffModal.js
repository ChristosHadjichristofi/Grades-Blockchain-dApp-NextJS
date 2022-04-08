import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from "./DiffModal.module.css";
import DownloadButton from '../DownloadButton/DownloadButton';

function DiffModal({ diff, show, modalTitle, toggleDiffModal, blockchainContent, urlContent }) {

    return (
        <>
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/styles/github.min.css" />
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css"/>
            <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/diff2html/bundles/js/diff2html-ui.min.js"></script>
        </div>

        <Modal className={`${styles.shadow}`} show={show} size="xl">
            <Modal.Header>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body><div dangerouslySetInnerHTML={{__html: diff}}/></Modal.Body>
            <Modal.Footer className={styles['space-between']}>
                <div className={styles.gap}>
                    <DownloadButton className={`${styles.shadow}`} name={"DL File from Blockchain"} filename={`BLOCKCHAIN_CONTENT_${modalTitle.replace('-','').replaceAll(' ', '_')}`} content={blockchainContent}></DownloadButton>
                    <DownloadButton className={`${styles.shadow}`} name={"DL File from URL"} filename={`URL_CONTENT_${modalTitle.replace('-','').replaceAll(' ', '_')}`} content={urlContent}></DownloadButton>
                </div>
                <Button className={`${styles.shadow}`} variant="secondary" onClick={toggleDiffModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default DiffModal;