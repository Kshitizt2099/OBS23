import React, { useEffect, useState } from 'react'
import No_User from './No_User/No_User'
import All_Books from './All_Books/All_Books'
import { get_Curr } from '../../User_Auth/User_Auth'

const Home = () => {
const [curr_user,setUser]=useState("");
useEffect(()=>{
    

    setUser(get_Curr());


},[]);



  return (
    <div>
       {curr_user==="N/A"?<No_User/>:<All_Books user={curr_user}/>}
      
    </div>
  )
}

export default Home
