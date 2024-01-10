import React, { useEffect, useState } from 'react'
import Checkout from '../Cart/Checkout'
import Nodetails from './Nodetails'
import db from '../../Firebase_files/Firebase_config'
import { collection,getDocs } from 'firebase/firestore'


const Check = () => {
    const [fulldetails,setfulldetails]=useState(false)
    const[user,setUser]=useState("")
    const[render,setrender]=useState(0)
   
    useEffect(()=>{
        const user_collection=collection(db,"Users");
      const getUsers=async()=>{
        const tar_user=JSON.parse(localStorage.getItem("curruser")).id;
            const allusers=await getDocs(user_collection);
            allusers.docs.forEach((doc)=>{
              
                  if(doc.id===tar_user && doc.data().Card!=="N/A")
                  {
                      setfulldetails(true);
                    
                  }
                 
  
            });
          
      } 
      getUsers();
      
      
     

      

    },[render]);
    const update=()=>{
      setrender(render+1);
    }
  return (
    <div>
        {fulldetails?<Checkout/>:<Nodetails update={update}/>}
    </div>
  )
}

export default Check
