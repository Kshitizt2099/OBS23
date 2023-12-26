import React from 'react'
import { useState,useEffect } from 'react'
import db from '../Firebase_files/Firebase_config';
import { collection, getDocs, } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { close, set_Curr } from '../User_Auth/User_Auth';
import { Link } from 'react-router-dom';
import Error from './Error/Error';
import './Login.css'
import Slideshow from './slideshow/Slideshow';

const Login = () => {
    const[users,setUsers]=useState([]);
   
    //Taking the data as input from inputfiels
    const[After_auth,setAuth] =useState(false);
    const initial_data={
     Name:"",
     Email:"",
     Pass:"",
     found:false
    };
    const[input,setip]=useState(initial_data);

    const navigate=useNavigate();
    useEffect(()=>{
      //can't make callback function async bad practice
      // 1.getDocs return all documents from specific collection
       //getting required  collection from all collections
      const user_collection=collection(db,"Users");
      const getUsers=async()=>{
       
            const allusers=await getDocs(user_collection);
            setUsers(allusers.docs.map((doc)=>{
                   return {...doc.data(),id:doc.id}
                 
  
            }));
           
      } 
      getUsers();
  
    },[])
    const Auth=()=>{
      
        //looping over users to find current User
        setAuth(true);
        for(let i=0;i<users.length;i++)
        {
          if(users[i].Name===input.Name && users[i].Email_id===input.Email && users[i].Password===input.Pass)
          {
           
               setip({...input,found:true});   
               set_Curr(input.Name,users[i].id);
               localStorage.setItem('OrderMap',JSON.stringify(users[i].OrderMap))
               console.log("After Logging in",users[i].OrderMap);
               return;
          }
        }
       
    };

    const images = [
      'https://image.api.playstation.com/vulcan/ap/rnd/202305/2420/c3daf3037feb797d9e71b81618e3b5ff3ff1f9609db5a4a2.png',
      'https://i.etsystatic.com/33364564/r/il/888660/3708844938/il_fullxfull.3708844938_h4zp.jpg',
      'https://cdn.theatlantic.com/thumbor/zdNraIiUX0W0WFT3UjO7hxa4VOQ=/79x44:1843x1036/976x549/media/img/mt/2017/04/your_name-1/original.jpg',
      'https://assetsio.reedpopcdn.com/ff7-rebirth-leads.png?width=1200&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp'
      ,'https://image.api.playstation.com/vulcan/ap/rnd/202106/1704/JzL1NLQvok7Pghe9W5PP2XNV.png'
      // Add more image URLs here
    ];
    
    return (
      <div className='Main'>
         <div className='Left'>
             <Slideshow images={images} intervalTime={2000} />
        

         </div>

         <div className='Right'>
          <div className='Welcome'>
             Welcome to bookstore
          </div>
          <div className='login-container'>
            <form onSubmit={Auth}>
            <label>UserName</label><br/>
         <input  className="input" type="text" onChange={(e)=>{setip({...input,Name:e.target.value})}} name="name" required/><br/>
         <label>Email</label><br/>
         <input  className="input" type="text" onChange={(e)=>{setip({...input,Email:e.target.value})}} name="Email" required/><br/>
         <label>Password</label><br/>
         <input  className="input" type="Password" onChange={(e)=>{setip({...input,Pass:e.target.value})}} name="Pass" required/><br/>
         
         <div className='Forgot'>
         <Link to="/Create">ForgotPassword??</Link>
         </div>
          
        <br/>
        
         <button className="sb" type="Submit">Login</button>
        
            </form>
            
            <div>
            <br/>
            <Link to="/Create">Create an account??</Link>
            </div>
            

        {
        
        After_auth===true?input.found===true?navigate('Home'):navigate(`Error/${"No User"}/Login`):
        ""
        
        }

          </div>
       

         </div>
                

  
      </div>
    )  
}

export default Login
