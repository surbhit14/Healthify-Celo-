// SPDX-License-Identifier: MIT
pragma solidity >=0.6.2 <0.9.0;
contract Test{

    struct Patient{ 
     string name;
     uint age;
}
    mapping(address=>bool) public exists;
    mapping(address=>Patient) public patients;
    

    function check(address _myAddr) public view returns(bool){
        if(exists[_myAddr])
        return true;
        else
        return false;
    }

    function addPatient (address _myAddr,string memory _name,uint _age) public 
    {
        patients[_myAddr]=Patient(_name,_age);
    
    }

    function getPatient(address _myAddr)view public returns (string memory ,uint){
        	return(patients[_myAddr].name,patients[_myAddr].age);
}
}