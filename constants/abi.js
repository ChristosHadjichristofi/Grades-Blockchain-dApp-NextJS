module.exports = {
  abi: [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "school",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "info",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "course",
          "type": "string"
        }
      ],
      "name": "addRecord",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "course",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "school",
          "type": "string"
        }
      ],
      "name": "retrieveCourseGrades",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "info",
              "type": "string"
            }
          ],
          "internalType": "struct Grades.CourseGradesData[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "node",
          "type": "address"
        }
      ],
      "name": "retrieveNodePermissions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bool",
              "name": "hasAccess",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isMaster",
              "type": "bool"
            },
            {
              "internalType": "string",
              "name": "school",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "addr",
              "type": "address"
            }
          ],
          "internalType": "struct Grades.NodePermissions",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "retrieveParticipants",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bool",
              "name": "hasAccess",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isMaster",
              "type": "bool"
            },
            {
              "internalType": "string",
              "name": "school",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "addr",
              "type": "address"
            }
          ],
          "internalType": "struct Grades.NodePermissions[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "node",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "school",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isMaster",
          "type": "bool"
        }
      ],
      "name": "addNetworkNode",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "node",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "v",
          "type": "bool"
        }
      ],
      "name": "voteAdd",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "voteList",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "node",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "yes",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "no",
              "type": "uint256"
            }
          ],
          "internalType": "struct Grades.VoteList[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]
}