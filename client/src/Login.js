import React, { useContext } from "react";
import { Context } from "./UserContext";

export default function ComponentA() {
  const [sign, setsign] = useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const verify= await VaultO.methods.login(id,password).call()
    if(verify)
    setsign([true,id,role]);
    else
    alert('The name you entered was: ${name}')
  }

  return (
    <form onSubmit={handleSubmit}>
    <label>Enter Id:
      <input 
        type="text" 
        value={id}
        onChange={(e) => setName(e.target.value)}
      />
    </label>
    <label>Enter password:
      <input 
        type="text" 
        value={password}
        onChange={(e) => setName(e.target.value)}
      />
    </label>
    <input type="submit" />
  </form>

    // <div>
    //   ComponentA:
    //   <button onClick={() => setsign(true)}>
    //     Login
    //   </button>
    // </div>
  );
}