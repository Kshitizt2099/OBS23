import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import db from '../../Firebase_files/Firebase_config'
import { collection,getDocs,updateDoc,doc, deleteDoc } from 'firebase/firestore'
import './Cart.css';
import No_User from '../Home_Page/No_User/No_User';
const Cart = () => {
  const [cartpro,setcart]=useState([]);
  const[render,setrender]=useState(0);
  
  useEffect(()=>{
    //can't make callback function async bad practice
    // 1.getDocs return all documents from specific collection
     //getting required  collection from all collections
    const cart_collection=collection(db,"Cart");
   
    const getCart=async()=>{
     
          const allcart=await getDocs(cart_collection);
          let temp=allcart.docs.map((doc)=>{
            return {...doc.data(),pid:doc.id}
          

          });
          const c_id=JSON.parse(localStorage.getItem('curruser')).id;
          setcart(temp.filter((i)=>( i.userid==c_id)));
          /*setcart(allcart.docs.map((doc)=>{
                 return {...doc.data(),pid:doc.id}
               

          }));*/
       
      
         
    } 
    getCart();
   
    

  },[render])
  const inc=async(id,Qty)=>{
    console.log(id,Qty);
    //Process of updating doc ,(find that doc and update that doc) ,find doc by doc
    const tar_doc=doc(db,"Cart",id);
   
    await updateDoc(tar_doc,{Qty:Qty+1});
    setrender(render+1);
    
    // <button onClick={()=>{inc(i.pid,i.Qty)}}>inc</button> <button onClick={()=>{dec(i.pid,i.Qty)}}>dec</button>

  }
  const dec=async(id,Qty)=>{
   
    //Process of updating doc ,(find that doc and update that doc) ,find doc by doc
    const tar_doc=doc(db,"Cart",id);
    if(Qty>1)
    {
      await updateDoc(tar_doc,{Qty:Qty-1});
      setrender(render+1);
    }
    else{
      del(id);
    }
   
  }

const del=async(id)=>{
  console.log("To be deleted elemnt",id);
  localStorage.setItem('cartlength',localStorage.getItem('cartlength')-1);
  const tar_doc=doc(db,"Cart",id);
  await deleteDoc(tar_doc);
  setrender(render+1);
}
  
 var price=0;
 for(let i=0;i<cartpro.length;i++)
 {
  price+=cartpro[i].Price*cartpro[i].Qty;
 }
 const Checkout=(price)=>{
   localStorage.setItem("bill",price);
   let Products="";
   let OrderMap=JSON.parse(localStorage.getItem('OrderMap'));
   for(let i=0;i<cartpro.length;i++)
   {
    Products+=cartpro[i].Name+",";
    OrderMap[cartpro[i].Name]=true;
   }
   localStorage.setItem("Products",Products);
   localStorage.setItem("OrderMap",JSON.stringify(OrderMap));
   return;
 
 };
   return (
    <div>
          {
             localStorage.getItem('curruser')!==null? <div className='body'>
             <Link to="/Home"><img className='images' src="https://cdn-icons-png.flaticon.com/512/626/626029.png?w=740&t=st=1691251062~exp=1691251662~hmac=ee05a04df5b04165dce804f663d33a071c3aca66f6121f99290d4bf2630d712f"/></Link>
          
            <div className="cart-container">
            
            {cartpro.map((i)=>( 
            <div key={i.pid} className='cart-item'>
              <div className="item-details">
                      <div className="item-title">{i.Name}</div>
                      <div className="item-price">{i.Price}</div>
      
              </div>
                                <div>
                                <span> 
                     <img onClick={()=>{inc(i.pid,i.Qty)}} className='images' src="https://cdn-icons-png.flaticon.com/512/63/63747.png?w=740&t=st=1691249863~exp=1691250463~hmac=42b79f9d795120f8d1f8473b0097ca68e91126f4a95f030cdb907702b71f1246" />
                      <div class="Qty">{i.Qty}</div>
                     <img onClick={()=>{dec(i.pid,i.Qty)}} className='images 'src="https://cdn-icons-png.flaticon.com/512/339/339879.png?w=740&t=st=1691250297~exp=1691250897~hmac=caab67049471c6237e914a9aea4dcb6c6dc7c3192d80e834b0e30bc367301411" />
                 
                      </span>
                                <span className='del'>    <img onClick={()=>{del(i.pid)}} className='images 'src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" /></span>
                                  </div>
              
             
             
              
              
              </div>))}
              <div class="total-price">Total: RS {price}</div>
            
            </div>
            <div class="checkout_Conatiner">
            <Link to="/CheckOut"><button  className="checkout" onClick={()=>{Checkout(price)}}>Checkout</button></Link>
        
          </div>
      
         
         
          </div>:<No_User/>
          }
    </div>
   
  )
}

export default Cart
