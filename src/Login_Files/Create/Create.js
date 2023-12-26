import React, { useState } from 'react'
import { addDoc, collection,getDocs } from 'firebase/firestore'
import './Create.css'
import db from '../../Firebase_files/Firebase_config'
import { Navigate } from 'react-router-dom'
const Create = () => {
    let initial={
        Name:"",
        Email_id:"",
        PIN:"",
        Password:"",
        Card:"N/A",
        CVV:"N/A"

    }
    let initialconfig={
       Created:false,
       Process:false
    }
    const[data,setdata]=useState(initial);
    const[created,setcreated]=useState(initialconfig)
    const CreateUser=async(e)=>{


        const usercollection=collection(db,"Users");

        e.preventDefault();

        const allUsers=await getDocs(usercollection);

        let temp=allUsers.docs.map((doc)=>{
            return {...doc.data(),id:doc.id}
          

          });
        for(let i=0;i<temp.length;i++)
        {
            if(temp[i].Email_id===data.Email_id)
            {
                setcreated({Created:false,Process:true});
                return;
            }
        }
        await addDoc(usercollection,data);
        setcreated({Created:true,Process:true});

    }

  return (
    <div className='Create_Body'>
       <div className="create-container">
    <h1>User Account Creation </h1>
    <form>
        
        <input className='Field' type="text" name="name" placeholder="Username" onChange={(e)=>{setdata({...data,Name:e.target.value})}} required/>
       
        <input className='Field' type="email" name="email" placeholder="email" onChange={(e)=>{setdata({...data,Email_id:e.target.value})}}required/>
        <input className='Field' type="password" name="password" onChange={(e)=>{setdata({...data,Password:e.target.value})}} placeholder="Password" required/>
        <input onClick={(e)=>{CreateUser(e)}} className="submit" type="submit" value="Create"/>
    </form>
</div>
        {created.Created===true?<Navigate to="/Success/AccountCreated/Login"/>:created.Process===true?<Navigate to="/Error/Please chooose another emailid/Create"/>:""}

    </div>
   
  )
}

export default Create
