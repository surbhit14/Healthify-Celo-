// pragma solidity >=0.4.22 <0.9.0;

// contract Users {
//   uint public patientCount;
  
//   struct Patient {
//   	// uint patientid;
//   	address patientAddress;
//   	string name;
//   	uint age;
//   	uint contact;
//   	string userAddress;
//   	uint prescriptionCount;
//   	uint receiptCount;
//   	uint recordCount;
//   	Prescription[] prescriptions;
//   	Record[] records;
//   	Receipt[] receipts;
//   }

//   struct HealthCare {
// 	address chainAddress;
// 	string name;
// 	uint contact;
// 	string healthCareAddress;
// 	uint patientsCount;
//   }

//   struct Record {
//   	uint recordid;
//   	string disease;
//   	address chainAddress;
//   	string timestamp;
//   }

//   struct Receipt {
//   	uint receiptid;
//   	address chainAddress;
//   	string timestamp;
//   	uint totalcost;
//     string drugname;
//     uint drugCount;
//   }

//   struct Prescription {
//   	uint prescriptionid;
//   	address healthCareAddress;
//   	string timestamp;
//     string drugname;
//   	uint drugCount;
//   }

//   struct Drug {
//   	uint drugid;
//   	string drugname;
//   	uint count;
//   }

//   struct Pharmacy {
//   	address chainAddress;
//   	string name;
//   	uint contact;
//   	string userAddress;
//   }

//   struct Insurance {
//   	address chainAddress;
//   	string name;
//   	uint contact;
//   	string userAddress;
//   } 

//   // struct User {
//   // 	address chainAddress;
//   // 	bool patient;
//   // 	bool healthCare;
//   // 	bool pharmacy;
//   // 	bool insurance;
//   // }

//   event addPatient(
//   	uint id,
//   	address patientAddress,
//   	string name,
//   	uint age,
//   	uint contact,
//   	string userAddress
//   );

//    event addPrescription(
//   	uint prescriptionid,
//   	address healthCareAddress,
//     string drugname,
//   	string timestamp
//   );

//    event addRecord(
//    	uint recordid,
//   	string disease,
//   	address chainAddress,
//   	string timestamp
//   );

//    event addReceipt(
//   	uint receiptid,
//   	address chainAddress,
//     string drugname,
//   	string timestamp,
//   	uint totalcost
//   );

//    event addDrug(
//   	uint drugid,
//   	string drugname,
//   	uint count
//   );

//   constructor() public {
//     // setPatient(0x95b9a26f931E8f554e666CCe54c4993e7dcCbb29,
//     //   "P1",16,4464819494,"Juhu");
//   }

//    mapping (uint => Patient) patients;
//    // Patient[] public patients;
//    uint[] public patientsList;

//   function setPatient(address _patientAddress,string  _name,uint _age,uint _contact,string  _userAddress) public {
//   	var id = patientCount + 1;
//   	var patient = patients[id];
//   	// patients[id] = patienty;
//     patient.patientAddress = _patientAddress;
//     patient.name = _name;
//     patient.age = _age;
//     patient.contact = _contact;
//     patient.userAddress = _userAddress;
//     patient.prescriptionCount = 0;
//   	patient.receiptCount = 0;
//   	patient.recordCount = 0;

//     patientsList.push(id) -1;
//     // patients.push(patient);
//     patientCount++;
//     emit addPatient(id,_patientAddress,_name,_age,_contact,_userAddress);
//   }

//   function getPatientCount() view public returns(uint) {
//     return (patientCount);
//   }
  
//   function getPatient(uint _id) view public returns (address,string ,uint,uint,string) {
//   	return(patients[_id].patientAddress,patients[_id].name,
//       patients[_id].age,patients[_id].contact,patients[_id].userAddress
//       );
//   }

//   function getCount(uint _id) view public returns (uint,uint,uint) {
//     return(patients[_id].recordCount,patients[_id].prescriptionCount,patients[_id].receiptCount);
//   }

//   function setPrescription(uint _patientid,address _healthCareAddress,string _drugname,string _timestamp) public {
//   	Prescription memory temp;
//   	var id = patients[_patientid].prescriptionCount;
//   	temp.prescriptionid = id;
//   	temp.healthCareAddress = _healthCareAddress;
//   	temp.timestamp = _timestamp;
//     temp.drugname = _drugname;
//   	temp.drugCount = 0;

//   	patients[_patientid].prescriptions.push(temp);
//   	patients[_patientid].prescriptionCount++;
//   	emit addPrescription(id,_healthCareAddress,_drugname,_timestamp);
//   }

//   function getPrescription(uint _patientid,uint _index) view public returns (uint,address,uint,string) {
//   	return(patients[_patientid].prescriptions[_index].prescriptionid,
//       patients[_patientid].prescriptions[_index].healthCareAddress,
//   		patients[_patientid].prescriptions[_index].drugCount,
//   		patients[_patientid].prescriptions[_index].timestamp);
//   }

//   function setReceipt(uint _patientid,address _chainAddress,string _drugname,string _timestamp,uint _totalcost) public {
//   	Receipt memory temp;
//   	var id = patients[_patientid].receiptCount;
//   	temp.receiptid = id;
//   	temp.chainAddress = _chainAddress;
//   	temp.timestamp = _timestamp;
//     temp.drugname = _drugname;
//   	temp.totalcost = _totalcost;

//   	patients[_patientid].receipts.push(temp);
//   	patients[_patientid].receiptCount++;
//   	emit addReceipt(id,_chainAddress,_drugname,_timestamp,_totalcost);
//   }

//   function getReceipt(uint _patientid,uint _index) view public returns (uint,address,string,string,uint) {
//   	return(patients[_patientid].receipts[_index].receiptid,
//   		patients[_patientid].receipts[_index].chainAddress,
//   		patients[_patientid].receipts[_index].timestamp,
//       patients[_patientid].receipts[_index].drugname,
//   		patients[_patientid].receipts[_index].totalcost);
//   }

//   function setRecord(uint _patientid,address _chainAddress,string _timestamp,string _disease) public {
//   	Record memory temp;
//   	var id = patients[_patientid].recordCount;
//   	temp.recordid = id;
//   	temp.chainAddress = _chainAddress;
//   	temp.disease = _disease;
//   	temp.timestamp = _timestamp;

//   	patients[_patientid].records.push(temp);
//   	patients[_patientid].recordCount++;
//   	emit addRecord(id,_disease,_chainAddress,_timestamp);
//   }

//   function getRecord(uint _patientid,uint _index) view public returns (uint,address,string ,string) {
//   	return(patients[_patientid].records[_index].recordid,
//   		patients[_patientid].records[_index].chainAddress,
//   		patients[_patientid].records[_index].disease,
//   		patients[_patientid].records[_index].timestamp);
//   }

//   // function setDrug(uint _patientid,uint _prescriptionid, string _drugname,uint _count) public {
//   // 	Drug  temp;
//   // 	uint256 id = patients[_patientid].prescriptions[_prescriptionid].drugCount;
//   // 	temp.drugid = id;
//   // 	temp.drugname = _drugname;
//   // 	temp.count = _count;

//   // 	patients[_patientid].prescriptions[_prescriptionid].drugs.push(temp);
//   // 	patients[_patientid].prescriptions[_prescriptionid].drugCount++;
//   // 	emit addDrug(id,_drugname,_count);
//   // }

//   // function getDrug(uint _patientid,uint _prescriptionid,uint _receiptid,uint _drugid) view public returns (uint,string  ,uint256) {
//   // 	return(patients[_patientid].prescriptions[_prescriptionid].drugs[_drugid].drugid,
//   // 		patients[_patientid].prescriptions[_prescriptionid].drugs[_drugid].drugname,
//   // 		patients[_patientid].prescriptions[_prescriptionid].drugs[_drugid].count);
//   // }

// }
