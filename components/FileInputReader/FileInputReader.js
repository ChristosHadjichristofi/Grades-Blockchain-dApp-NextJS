const FileImport = ({ setFileContent }) => {
    let fileReader;

    const handleFileRead = (e) => {
        const content = fileReader.result;
        setFileContent(content);
    };

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    return <div className='upload-expense'>
        <input
            type='file'
            id='file'
            className='input-file'
            accept='.bau'
            onChange={e => handleFileChosen(e.target.files[0])}
        />
    </div>;
};

export default FileImport;