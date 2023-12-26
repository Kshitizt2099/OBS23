import db from "../Firebase_files/Firebase_config";
import { collection,getDocs } from "firebase/firestore";
export const get_Curr=()=>{
   

    
    let curruser=localStorage.getItem("curruser")
    if(curruser===null || curruser===undefined)
    {
        localStorage.setItem("curruser", JSON.stringify({Name:"N/A",id:"N/A"}));
        return "N/A";
    }
    let Logged_user=JSON.parse(curruser).Name;
    return Logged_user;
  



}


export const set_Curr=(Name,id)=>{
 
    localStorage.setItem("curruser", JSON.stringify({Name,id}));

}

export const Logout=()=>{
 
    localStorage.removeItem("curruser");
    localStorage.removeItem("books");
    localStorage.removeItem("cartlength");
    

}

export const close=()=>{
 
    localStorage.removeItem("curruser");

}


