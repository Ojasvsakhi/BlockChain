import { ethers } from "ethers";
import Web3Modal from "web3modal";

export const connectWallet = async () => {
  try {
    //const web3Modal = new Web3Modal();
    //const instance = await web3Modal.connect();
    //const provider = new ethers.providers.Web3Provider(instance);
    const provider = await getProvider();// ✅ Correct provider for ethers v6
    const signer = provider.getSigner();
    return signer;
  } catch (error) {
    console.error("Wallet connection failed", error);
  }
};

const { ethereum } = window;



export const getChainId = async () => {
  try {
    const web3Modal = new Web3Modal();
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const chainId = await provider.getNetwork().then(data => data.chainId);
    return chainId;
  } catch (error) {
    console.error("Failed to get chainId", error);
  }
};


const CONTRACT_ADDRESS = "0x1A0c764885D7257234295B21bC10C7cCB540C321";
const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "verifier",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "cid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "sex",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dob",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "mobile",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "college",
        "type": "string"
      },
      {
        "internalType": "int256",
        "name": "isOver18",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "isCollegeStudent",
        "type": "int256"
      }
    ],
    "name": "addVReq",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "verifier",
        "type": "string"
      }
    ],
    "name": "getVerifierAddress",
    "outputs": [
      {
        "internalType": "string",
        "name": "verifierAddress",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "verifierAddress",
        "type": "string"
      }
    ],
    "name": "getVerifierName",
    "outputs": [
      {
        "internalType": "string",
        "name": "verifierName",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "org",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "name",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "sex",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "dob",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "mobile",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "email",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "college",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isOver18",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isCollegeStudent",
        "type": "bool"
      }
    ],
    "name": "giveAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "showUserInfo",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "sex",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dob",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "mobile",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "college",
        "type": "string"
      },
      {
        "internalType": "int256",
        "name": "isOver18",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "isCollegeStudent",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "showUserInfoBoolsByOrg",
    "outputs": [
      {
        "internalType": "int256",
        "name": "isOver18",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "isCollegeStudent",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "showUserInfoByOrg",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "sex",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dob",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "mobile",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "college",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "showUserVerificationReqList",
    "outputs": [
      {
        "internalType": "address",
        "name": "verifier",
        "type": "address"
      },
      {
        "internalType": "int256",
        "name": "status",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "showUserVerificationReqListLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "showVerifierVerificationReqList",
    "outputs": [
      {
        "internalType": "string",
        "name": "cid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "id",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "int256",
        "name": "status",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "metaIndex",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "showVerifierVerificationReqListLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "showVerifierVerificationReqScopeBoolsList",
    "outputs": [
      {
        "internalType": "int256",
        "name": "isOver18",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "isCollegeStudent",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "showVerifierVerificationReqScopeList",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "sex",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dob",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "mobile",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "college",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "decision",
        "type": "bool"
      }
    ],
    "name": "verifyReq",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

async function getProvider() {
    if (!window.ethereum) throw new Error("MetaMask is not installed");
    return new ethers.provider.Web3Provider(window.ethereum);
}

async function getSigner() {
    const provider = await getProvider();
    await provider.send("eth_requestAccounts", []);
    return provider.getSigner();
}

async function getContract() {
    const signer = await getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

const createEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum); // Ensure 'ethereum' is defined
  const signer = await provider.getSigner(); // Await signer properly
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

export async function getUserDetails(){
  try {
    const contract = await createEthereumContract();
    const [
      name,
      sex,
      dob,
      mobile,
      email,
      college,
      isOver18,
      isCollegeStudent
    ] = await contract.showUserInfo();

    // Convert BigNumbers to strings/numbers
    const userDetails = {
      name,
      sex,
      dob,
      mobile: mobile.toString(),
      email,
      college,
      isOver18: isOver18.toString(),
      isCollegeStudent: isCollegeStudent.toString()
    };

    console.log("User details:", userDetails);
    return userDetails;
  } catch (error) {
    console.log("Error while fetching userInfo",error);
  }
}


/** ✅ Fetch list of user verification requests */
export async function getUserList() {

    try {
      //const provider = new ethers.BrowserProvider(window.ethereum);
      //const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

        const contract = await createEthereumContract();


        const length = await contract.showUserVerificationReqListLength();
        console.log(length);
        let userList = [];
        
        for (let i = 0; i < length; i++) {
            const res = await contract.showUserVerificationReqList(i);
            const ver = await getVerifierName(res[0]);
        
            userList.push({ 
              verifier: ver, 
              status: Number(res[1]) // Convert BigInt to a regular number
            });
        }
  
        return userList;
    } catch (error) {
        console.error("Error fetching user list:", error);
    }
}

/** ✅ Fetch list of verifier verification requests */
export async function getVerifierList() {
    try {
        const contract = await createEthereumContract();
      
        const length = await contract.showVerifierVerificationReqListLength();
        console.log(length);
        const userList = [];
        let i = 0;
        while(i<length){
          const obj = {};
          let res = await contract.showVerifierVerificationReqList(i);
          obj.cid = res.cid;
          obj.id = res.id;
          obj.metaIndex = Number(res.metaIndex);
          obj.status = Number(res.status);
          obj.user = res.user;

          res = await contract.showVerifierVerificationReqScopeList(i);
          obj.sex = res.sex;
          obj.name = res.name;
          obj.dob = res.dob;
          obj.mobile = Number(res.mobile);
          obj.email = res.email;
          obj.college = res.college;

          res = await contract.showVerifierVerificationReqScopeBoolsList(i);
          obj.isOver18 = Number(res.isOver18);
          obj.isCollegeStudent = Number(res.isCollegeStudent);
          
          userList.push(obj)
          i++;
        }
        console.log(userList);
        return userList;
    } catch (error) {
        console.error("Error fetching verifier list:", error);
    }
}

/** ✅ Submit user identity document */
export async function submitDoc(verifier, cid, id, name, sex, dob, mobile, email, college) {
  try {
      const contract = await createEthereumContract();
      if (!contract) {
          throw new Error("Contract not initialized");
      }
      const verifierAddress = await getVerifierAddress(verifier);
      let dobString = "";
      let isOver18 = 0; // Default if DOB is missing
      if(isNaN(mobile)){
        mobile = 0;
      }
      
      if (dob) {
          const parsedDate = new Date(dob);
          if (isNaN(parsedDate?.getTime())) {
              throw new Error(`Invalid DOB: ${dob}`);
          }
          dobString = parsedDate?.toISOString()?.split("T")[0]; // Convert to YYYY-MM-DD
          isOver18 = new Date(dob)?.getFullYear() <= new Date()?.getFullYear() - 18 ? 1 : 0;
      }

      const isCollegeStudent = college ? 1 : 0;

      const tx = await contract.addVReq(
        verifierAddress, cid, id, name, sex, dobString, mobile, email, college, isOver18, isCollegeStudent,
          
      );
      console.log("Transaction sent:", tx);
      
      await tx.wait();
      console.log("Transaction confirmed:", tx.hash);

      return tx.hash;
  } catch (error) {
      console.error("Error submitting document:", error);
  }
}




/** ✅ Give access to an organization */
export async function giveAccess(org, name, sex, dob, mobile, email, college,isOver18,isCollegeStudent) {
    try {
      const contract = await createEthereumContract();

        const tx = await contract.giveAccess(
            org, name, sex, dob, mobile, email, college, isOver18, isCollegeStudent
        );
        await tx.wait();
        console.log("Access Given:", tx.hash);
        return tx.hash;
    } catch (error) {
        console.error("Error giving access:", error);
    }
}

/** ✅ Verifier verifies a request */
export async function verifyRequest(user, index, decision) {
    try {
      const contract = await createEthereumContract();
      let d = true;
      if(decision === -1) d = false;
        const tx = await contract.verifyReq(user, index, d);
        await tx.wait();
        console.log("Verification Successful:", tx.hash);
        return tx.hash;
    } catch (error) {
        console.error("Error verifying request:", error);
    }
}

/** ✅ Get the address of a verifier */
export async function getVerifierAddress(verifier) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        const address = await contract.getVerifierAddress(verifier);
        return address;
    } catch (error) {
        console.error("Error fetching verifier address:", error);
    }
}

/** ✅ Get the name of a verifier */
export async function getVerifierName(address) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        const name = await contract.getVerifierName(address);
        return name;
    } catch (error) {
        console.error("Error fetching verifier name:", error);
    }
}


export async function getVerifiedDataThirdParty(user){
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const userDetail = await contract.showUserInfoByOrg(user);
    const boolUserDetail = await contract.showUserInfoBoolsByOrg(user);
    const user = [...userDetail,...boolUserDetail];
    return user;
  } catch (error) {
    console.error("Error while Fetching Data for third party!",error);
  }
}
