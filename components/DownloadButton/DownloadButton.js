import Button from 'react-bootstrap/Button';

export default function DownloadButton(props) {
    return (
        <Button download={props.filename} href={URL.createObjectURL(new Blob(props.content, { type: "application/text" } ))}>
            {props.name}
        </Button>
    );
}