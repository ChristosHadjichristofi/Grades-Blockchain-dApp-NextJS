import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Menu.module.css";

export default function MenuPage() {
  return (
    //   should only appear if loggedIn (metamask)
    <>
      <Navbar />

      <div className={`container ${styles["row-container"]}`}>
        <div className={`row ${styles["row-margin"]}`}>
          <Card
            title="Form Completion"
            details="Add new Grades Information for a specific course to the Blockchain"
            route="/form/add/grades-info"
          />
          <Card
            title="Show Courses"
            details="List of all school courses. In this page you can see all Grades Information regarding a course"
            route="/show/courses"
          />
          <Card
            title="Vote List"
            details="List of all nodes that applied to be a part of the network. Each participant can vote"
            route="/show/vote-list"
          />
        </div>
      </div>

      {/* should only appear if MasterNode */}
      <div className={`container ${styles["row-container"]}`}>
        <div className={`row ${styles["row-margin"]}`}>
          <Card
            title="Add Node"
            details="Give access to a new node. You must be a master node to be able to add a new node"
            route="/form/add/node"
          />
          <Card
            title="Show Participants"
            details="See all participant nodes. Only a master node is able to see the regarding information"
            route="/show/participants"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
