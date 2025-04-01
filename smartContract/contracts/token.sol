// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Token {
    address owner;

    struct Scopes {
        string name;
        string sex;
        string dob;
        uint mobile;
        string email;
        string college;
        int isOver18;
        int isCollegeStudent;
    }

    struct VReq {
        string cid;
        string id;
        address user;
        Scopes scopes;
        int status;
        uint metaIndex;
    }

    struct VReqMeta {
        address verifier;
        int status;
    }

    mapping(address => Scopes) UserInfo;

    mapping(address => VReq[]) VerifierVReqs;
    mapping(address => VReqMeta[]) UserVReqs;

    mapping(address => mapping(address => Scopes)) UserOrgAccess;

    mapping(string => string) addressVerifierMap;
    mapping(string => string) verifierAddressMap;

    constructor(){
        owner = msg.sender;

        addressVerifierMap["0xA428307EE5a4768904D41C660f26cD03D2b8e2cA"] = "RTO";
        verifierAddressMap["RTO"] = "0xA428307EE5a4768904D41C660f26cD03D2b8e2cA";
        //addressVerifierMap["0xf4b949991740de4c090851059ebf9d985fb46bb3"] = "MNNIT A";
        //verifierAddressMap["MNNIT A"] = "0xf4b949991740de4c090851059ebf9d985fb46bb3";
        addressVerifierMap["0x93C6b9f263BC2437a1Ee9e42a7E85fB1473A9252"] = "UIDAI";
        verifierAddressMap["UIDAI"] = "0x93C6b9f263BC2437a1Ee9e42a7E85fB1473A9252";
    }

    function addVReq(
        address verifier,
        string memory cid,
        string memory id,
        string memory name,
        string memory sex,
        string memory dob,
        uint mobile,
        string memory email,
        string memory college,
        int isOver18,
        int isCollegeStudent
    ) public {
        VerifierVReqs[verifier].push(VReq(cid,id,msg.sender, Scopes(name, sex, dob, mobile, email, college, isOver18, isCollegeStudent), 0, UserVReqs[msg.sender].length));
        UserVReqs[msg.sender].push(VReqMeta(verifier, 0));
    }

    function showVerifierVerificationReqListLength() public view returns (uint) {  
        return VerifierVReqs[msg.sender].length;
    }

    function showVerifierVerificationReqList(uint index) public view returns (
        string memory cid,
        string memory id,
        address user,
        int status,
        uint metaIndex
    ) {  
        return (
            VerifierVReqs[msg.sender][index].cid,
            VerifierVReqs[msg.sender][index].id,
            VerifierVReqs[msg.sender][index].user,
            VerifierVReqs[msg.sender][index].status,
            VerifierVReqs[msg.sender][index].metaIndex
        );
    }

    function showVerifierVerificationReqScopeList(uint index) public view returns (
        string memory name,
        string memory sex,
        string memory dob,
        uint mobile,
        string memory email,
        string memory college
    ) {
        return (
            VerifierVReqs[msg.sender][index].scopes.name,
            VerifierVReqs[msg.sender][index].scopes.sex,
            VerifierVReqs[msg.sender][index].scopes.dob,
            VerifierVReqs[msg.sender][index].scopes.mobile,
            VerifierVReqs[msg.sender][index].scopes.email,
            VerifierVReqs[msg.sender][index].scopes.college
        );
    }

    function showVerifierVerificationReqScopeBoolsList(uint index) public view returns (
        int isOver18,
        int isCollegeStudent
    ) {
        return (
            VerifierVReqs[msg.sender][index].scopes.isOver18,
            VerifierVReqs[msg.sender][index].scopes.isCollegeStudent
        );
    }

    function showUserVerificationReqListLength() public view returns (uint) {
        return UserVReqs[msg.sender].length;
    }

    function showUserVerificationReqList(uint index) public view returns (
        address verifier,
        int status
    ) {
        return (
            UserVReqs[msg.sender][index].verifier,
            UserVReqs[msg.sender][index].status
        );
    }

    function verifyReq(address user, uint index, bool decision) public {
         VReq storage vreq = VerifierVReqs[msg.sender][index]; //msg.sender instead of user
         require(vreq.user == user, "Request does not belong to this user");
        if (decision) {
            vreq.status = 1;
            UserVReqs[vreq.user][vreq.metaIndex].status = 1;
            if (keccak256(abi.encodePacked(vreq.scopes.name)) != keccak256(abi.encodePacked(""))) {
                UserInfo[vreq.user].name = vreq.scopes.name;
            }
            if (keccak256(abi.encodePacked(vreq.scopes.sex)) != keccak256(abi.encodePacked(""))) {
                UserInfo[vreq.user].sex = vreq.scopes.sex;
            }
            if (keccak256(abi.encodePacked(vreq.scopes.dob)) != keccak256(abi.encodePacked(""))) {
                UserInfo[vreq.user].dob = vreq.scopes.dob;
            }
            if (vreq.scopes.mobile != 0) {
                UserInfo[vreq.user].mobile = vreq.scopes.mobile;
            }
            if (keccak256(abi.encodePacked(vreq.scopes.email)) != keccak256(abi.encodePacked(""))) {
                UserInfo[vreq.user].email = vreq.scopes.email;
            }
            if (keccak256(abi.encodePacked(vreq.scopes.college)) != keccak256(abi.encodePacked(""))) {
                UserInfo[vreq.user].college = vreq.scopes.college;
            }
            if (vreq.scopes.isOver18 != 0) {
                UserInfo[vreq.user].isOver18 = vreq.scopes.isOver18;
            }
            if (vreq.scopes.isCollegeStudent != 0) {
                UserInfo[vreq.user].isCollegeStudent = vreq.scopes.isCollegeStudent;
            }
        }
        else {
            vreq.status = -1;
            UserVReqs[vreq.user][vreq.metaIndex].status = -1;
        }
    }

    function showUserInfo() public view returns (
        string memory name,
        string memory sex,
        string memory dob,
        uint mobile,
        string memory email,
        string memory college,
        int isOver18,
        int isCollegeStudent
    ) {
        return (
            UserInfo[msg.sender].name,
            UserInfo[msg.sender].sex,
            UserInfo[msg.sender].dob,
            UserInfo[msg.sender].mobile,
            UserInfo[msg.sender].email,
            UserInfo[msg.sender].college,
            UserInfo[msg.sender].isOver18,
            UserInfo[msg.sender].isCollegeStudent
        );
    }

    function giveAccess(
        address org,
        bool name,
        bool sex,
        bool dob,
        bool mobile,
        bool email,
        bool college,
        bool isOver18,
        bool isCollegeStudent
    ) public {
        if (name) {
            UserOrgAccess[msg.sender][org].name = UserInfo[msg.sender].name;
        }
        else {
            UserOrgAccess[msg.sender][org].name = '';
        }
        if (sex) {
            UserOrgAccess[msg.sender][org].sex = UserInfo[msg.sender].sex;
        }
        else {
            UserOrgAccess[msg.sender][org].sex = '';
        }
        if (dob) {
            UserOrgAccess[msg.sender][org].dob = UserInfo[msg.sender].dob;
        }
        else {
            UserOrgAccess[msg.sender][org].dob = '';
        }
        if (mobile) {
            UserOrgAccess[msg.sender][org].mobile = UserInfo[msg.sender].mobile;
        }
        else {
            UserOrgAccess[msg.sender][org].mobile = 0;
        }
        if (email) {
            UserOrgAccess[msg.sender][org].email = UserInfo[msg.sender].email;
        }
        else {
            UserOrgAccess[msg.sender][org].email = '';
        }
        if (college) {
            UserOrgAccess[msg.sender][org].college = UserInfo[msg.sender].college;
        }
        else {
            UserOrgAccess[msg.sender][org].college = '';
        }
        if (isOver18) {
            UserOrgAccess[msg.sender][org].isOver18 = UserInfo[msg.sender].isOver18;
        }
        else {
            UserOrgAccess[msg.sender][org].isOver18 = 0;
        }
        if (isCollegeStudent) {
            UserOrgAccess[msg.sender][org].isCollegeStudent = UserInfo[msg.sender].isCollegeStudent;
        }
        else {
            UserOrgAccess[msg.sender][org].isCollegeStudent = 0;
        }
    }

    function showUserInfoByOrg(address user) public view returns (
        string memory name,
        string memory sex,
        string memory dob,
        uint mobile,
        string memory email,
        string memory college
    ) {
        return (
            UserOrgAccess[user][msg.sender].name,
            UserOrgAccess[user][msg.sender].sex,
            UserOrgAccess[user][msg.sender].dob,
            UserOrgAccess[user][msg.sender].mobile,
            UserOrgAccess[user][msg.sender].email,
            UserOrgAccess[user][msg.sender].college
        );
    }

    function showUserInfoBoolsByOrg(address user) public view returns (
        int isOver18,
        int isCollegeStudent
    ) {
        return (
            UserOrgAccess[user][msg.sender].isOver18,
            UserOrgAccess[user][msg.sender].isCollegeStudent
        );
    }

    function getVerifierAddress(string memory verifier) public view returns (string memory verifierAddress) {
        return verifierAddressMap[verifier];
    }

    function getVerifierName(string memory verifierAddress) public view returns (string memory verifierName) {
        return addressVerifierMap[verifierAddress];
    }
}