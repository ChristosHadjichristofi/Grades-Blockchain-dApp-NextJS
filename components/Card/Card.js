import Link from "next/link";
import styles from "./Card.module.css";

export default function Card(props) {
    return (
        <div className="col-md-4">
            <div className={`card ${styles["card-container-layout"]} ${styles.shadow}`}>
                <div className={`card-body ${styles["card-center"]}`}>
                    <h5 className="card-title">{props.title}</h5>
                    <hr/>
                    <p className="card-text">{props.details}</p>
                    <Link href={props.route}>
                        <a className={`btn btn-primary ${styles.shadow}`}>Go</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
