import React, { useState } from 'react'
import { Placeholder } from 'react-bootstrap';
import db from '../../Firebase_files/Firebase_config';
import { collection,doc,getDocs,updateDoc } from 'firebase/firestore';
import { redirect ,Link} from 'react-router-dom';
const Nodetails = (props) => {
    const[Card,setcard]=useState("");
    const[CVV,setcvv]=useState("");
    const[date,setdate]=useState("");
    const{update}=props
   
    const AddCard=async()=>{
       let user=JSON.parse(localStorage.getItem("curruser")).id
       const tar_doc=doc(db,"Users",user)
       await updateDoc(tar_doc,{Card,CVV,Date:date.toString()})
       update()
       redirect("/CheckOut")
      

    }

  return (
    <div>
      You have not entered Your card details.
      <input type='text' onChange={(e)=>{setcard(e.target.value)}} placeholder='Enter your cardnumber'/>
      <input type='text' onChange={(e)=>{setcvv(e.target.value)}} placeholder='Enter your cvv'/>
      <input type='date' onChange={(e)=>{setdate(e.target.value)}} placeholder="Enter your exp card's date"/>
      <button onClick={AddCard}>Add Card</button>
      
    </div>
  )
}

export default Nodetails
