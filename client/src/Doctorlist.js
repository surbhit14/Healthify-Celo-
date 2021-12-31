import React, { useState, useContext } from 'react';
import { UserContext } from "./UserContext";

function Doctorlist() {
    const address= useContext(UserContext);
    
    return (
        <div>
            {address}
        </div>
    )
}

export default Doctorlist
