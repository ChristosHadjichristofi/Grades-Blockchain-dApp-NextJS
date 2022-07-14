# Grades-Blockchain-dApp-NextJS
A dApp that manages Grades of a University through a private Ethereum network. This implementation is more product like which uses MetaMask to connect and then to interract with the smart contracts

## Technologies Used
* NextJS
* Solidity (for the smart contract)

## General Idea
* The users of the private blockchain network are the secretaries of the university schools
* A master user can retrieve all participants
* A master user can start a vote to add a new participant in the network. Several users can be voted to participate and have access to the blockchain's data. Many users can belong to a School
* When a vote has began for a specific wallet to be added as a participant, all the participants can vote for or against. There must be unanimity so as this wallet is added as a participant
* Multiple votes can be started together
* Grades information are saved based on the school and period of the exam. A corrective state can be added to the grades information (of a school's course at a specific exam period). The information can be retrieved and the full history can be shown (if more information are saved regarding a school's course at a specific exam period). Always the latest record of a school's course at a specific exam period is the current, and all the previous are the history
* At any time a user can check if the file's content that is uploaded to a server matches the content of the file that was saved in the blockchain. Unified diff string output produced and shown (if differences are found)
* Participants can retrieve a school's course grade info (this will show all the records grouped by exam period). Participants who are not master users can only retrieve the information that their wallet is bound to (for example if a wallet is bound to school A, then this wallet can only retrieve courses information of that school)

## Functions of Smart Contract
* addRecord: To add grades information of a school's course at a specific exam period
* retrieveCourseGrades: Retrieve the grades information of a specific course
* retrieveUserPermissions: Retrieves wallet's permissions (hasAccess, isMaster)
* retrieveParticipants: Retrieve all participants and their permissions
* addNetworkUser: Starts a vote so as a new wallet can participate in the network and interract with the contracts
* voteAdd: Vote for or against a candidate
* voteList: Retrieve all ongoing votes that you didn't vote

**The smart contract can be found [here](https://github.com/ChristosHadjichristofi/Grades-Blockchain-dApp/tree/main/contracts).**

## Save Grades Information
A form is filled, which has the following fields:
* School
* Period
* Course ID
* Professor
* Exam Date
* Number of Participants
* Participants passed
* Grades Asset (the same file that is uploaded to the dApp and eventually its content is saved in the blockchain)
* Update Status
* Grades File (Upload) - This file has a specific extention (.bau) and a specific format (which is similar to csv)

After the submission, a check is being made to check if all mandatory fields are filled and contain valid data. Then the grades' file content is been read and converted to base64. Then from the form's information an object is created and then submitted to the blockchain.

## Creation of Dummy .bau files
A script was created to generate a specified number of files that have the exact structure of the desired form. This was implemented so as this files can be used for demonstration of the dApp. The generator can be found [here](https://github.com/ChristosHadjichristofi/Grades-Blockchain-dApp/tree/main/bauGenerator).

## Thesis Information
Implementation of a private permissioned blockchain for University grades management
* Dipl thesis by Christos Hadjichristofi (christoshadjichristofi@hotmail.com)
* Supervisors: Prof.Vassilios Vescoukis, Mr.Ioannis Tzannetos, PhD Cand

### Abstract
A Blockchain is a distributed and decentralized immutable public ledger, that exists across a network. The Blockchain acts as a distributed database that is shared among the nodes of a network. More specifically, it stores information in digital format that can not be edited. Thus, it guarantees the integrity and security of any record of data and therefore, is capable of working without the need of a trusted third party. It is a well-known technology which bloomed over the past years, due to its capability to maintain transactions securely.

This diploma thesis aims to the development of a private Blockchain network with the respective smart contracts and front-end to manage University grades. The problem that this thesis solves, will be addressed and a complete solution will be discussed, among with concepts and basic principles like Blockchain, smart contracts, consensus algorithms but also with the difficulties that were encountered during the implementation of this system.

Finally, it is concluded that a system of such capability can be developed, deployed, exist and co-operate with any other legacy system and offer all the perks of Blockchain technology. In addition, ideas for further expansions of the examined system are discussed, along with the benefits that they may offer.
