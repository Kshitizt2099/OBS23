import React, { useState,useEffect } from 'react'
import { collection,getDocs } from 'firebase/firestore';
import db from '../../Firebase_files/Firebase_config';
import './Order.css';
import { get_Curr } from '../../User_Auth/User_Auth';
const Order = () => {
    //const[orders,setOrders]=useState([]);
    const[all_orders,set_all_Orders]=useState([]);
    const curr_user=get_Curr();
    useEffect(()=>{
       const order_collection=collection(db,"Orders");
       
       const curr_user_id=JSON.parse(localStorage.getItem("curruser")).id;
       const getOrders=async()=>{
        
         const Order_docs=await getDocs(order_collection);
        
         set_all_Orders(Order_docs.docs.filter((doc)=>{
                if(doc.data().user_id===curr_user_id)
                {
                    return {...doc.data(),id:doc.id}

                }
                           
            


       }
         ));


       
    } 
    getOrders();
    },[]);
 console.log(all_orders);
  return (
    <div>
        Order History of Mr.{curr_user};
       <table>
  <tr>
 
    <th>Products</th>
    <th>Total</th>
    <th>Date</th>
  </tr>
   {all_orders.length===0?"Please make purchase":all_orders.map((doc)=>(

<tr>
   
<td>{doc.data().Products}</td>
<td>{doc.data().bill}</td>
<td>{doc.data().order_date}</td>
</tr>

   ))}
  
  
</table>
    </div>
   
  )
}

export default Order
