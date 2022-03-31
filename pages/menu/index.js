import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import Router from "next/router";
import { abi } from "../../constants/abi";
import { ethers } from "ethers";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";

export default function Menu() {
  const {
    activate,
    active,
    chainId,
    account,
    library: provider,
  } = useWeb3React();
  const [user, setUser] = useState({});

  async function fetchUserData() {
    if (active) {
      const signer = provider.getSigner();
      const contractAddress = "0xd298b029aA37F7B08bF1F15bf7b210C8bE1C392a";
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        setUser(await contract.retrieveNodeInfo(account));
      } catch (e) {
        console.log(e);
      }
    } else Router.push("/");
  }

  fetchUserData();

  return (
    <div>
      {user.hasAccess ? (
        <>
          <Navbar />

          <div className="container" id="row-container">
            <div className="row" id="row">
              <div className="col-md-4">
                <Card
                  title="Form Completion"
                  details="Add new Grades Information for a specific course to the Blockchain"
                  route="/form/add/grades-info"
                />
              </div>
              <div className="col-md-4">
                <Card
                  title="Show Courses"
                  details="List of all school courses. In this page you can see all Grades Information regarding a course"
                  route="/courses"
                />
              </div>
              <div className="col-md-4">
                <Card
                  title="Vote List"
                  details="List of all nodes that applied to be a part of the network. Each participant can vote"
                  route="/show/vote-list"
                />
              </div>
            </div>
          </div>

          {user.isMaster ? (
            <>
              <div className="container" id="row-container">
                <div className="row" id="row">
                  <div className="col-md-4">
                    <Card
                      title="Add Node"
                      details="Give access to a new node. You must be a master node to be able to add a new node"
                      route="/form/add/node"
                    />
                  </div>
                  <div className="col-md-4">
                    <Card
                      title="Show Participants"
                      details="See all participant nodes. Only a master node is able to see the regarding information"
                      route="/show/participants"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          <Footer />
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}
