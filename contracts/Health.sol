
// pragma solidity >=0.4.22 <0.9.0;
// contract Health{
    
//     struct Patient {
//         string name;
//         uint id;
//         address[] doctorList;
//     }
    
//     struct Doctor {
//         string name;
//         uint id;
//         address[] patientList;
//     }

//     mapping (uint => Patient) patients;
   
//    uint[] public patientsList;

//        function add_agent(string memory _name, uint _age, uint _designation, string memory _hash) public returns(string memory){
//         address addr = msg.sender;
        
//         if(_designation == 0){
//             Patient memory p;
//             p.name = _name;
//             patientInfo[msg.sender] = p;
//             patientList.push(addr)-1;
//             return _name;
//         }
//        else if (_designation == 1){
//             doctorInfo[addr].name = _name;
//             doctorInfo[addr].age = _age;
//             doctorList.push(addr)-1;
//             return _name;
//        }
//        else{
//            revert();
//        }
//     }


// }