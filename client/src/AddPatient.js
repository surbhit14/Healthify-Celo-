import React from 'react'

function AddPatient() {
    return (
        <div>
             <form >	
					  <div >
					    <label >Unique ID</label>
					    <input type="number"></input>
					 </div>
                     <div >
					    <label >Name</label>
					    <input type="text"></input>
					 </div>
					  <div className="form-group">
					    <label htmlFor="exampleInputemail1">Address</label>
					    <input type="email" className="form-control" id="exampleInputPassword1" placeholder="Enter your Home Address"></input>
					  </div>
					  <div className="form-group">
					    <label htmlFor="exampleInputnumber1">Phone Number</label>
					    <input type="email" className="form-control" id="exampleInputPassword1" placeholder="Enter your Phone Number"></input>
					  </div>
					  <div className="form-group">
					    <label htmlFor="exampleInputemail1">Blood Group</label>
					    <input type="email" className="form-control" id="exampleInputPassword1" placeholder="Enter your Blood Group"></input>
					  </div>
					  <div className="form-group">
					    <label htmlFor="exampleInputnumber1">Insurance Company Id</label>
					    <input type="email" className="form-control" id="exampleInputPassword1" placeholder="Enter your Insurance Company Id"></input>
					  </div>
					  <div className="form-group">
					    <label htmlFor="exampleInputnumber1">Emergency Contact</label>
					    <input type="email" className="form-control" id="exampleInputPassword1" placeholder="Enter your Emergency Contact"></input>
					  </div>
        </div>
    )
}

export default AddPatient
