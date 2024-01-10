import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import db from '../../Firebase_files/Firebase_config';
import { collection,addDoc ,deleteDoc,doc,getDocs,updateDoc} from 'firebase/firestore';
import styled from 'styled-components';
import './checkout.css';
const Checkout = () => {
  
      
    const bill=localStorage.getItem("bill");
    const user_details=JSON.parse(localStorage.getItem("curruser"));
    const user_Name=user_details.Name;
    const user_id=user_details.id;
    const [cartpro,setcart]=useState([]);
    useEffect(()=>{
      const getCart=async()=>{
         const cart_collection=collection(db,"Cart");
         const allcart=await getDocs(cart_collection);
         let temp=allcart.docs.map((doc)=>{
           return {...doc.data(),pid:doc.id}
         

         });
         const c_id=JSON.parse(localStorage.getItem('curruser')).id;
         setcart(temp.filter((i)=>( i.userid==c_id)));
       
       
    
       
  } 
  getCart();
    },[])
    const inorder=async ()=>{
      //Deleting the Cart
     for(let i=0;i<cartpro.length;i++)
     {
       const curr_doc=doc(db,"Cart",cartpro[i].pid);
      await deleteDoc(curr_doc);
     }
      
      function getFormattedDate(date) {
        let year = date.getFullYear();
      
      
        let month=date.getMonth()+1;
       console.log(month,"month")
        
        let day=date.getDate()
      
        return month + "/" + day + "/" + year;
      }
      const order_collection=collection(db,"Orders");
      let date=new Date();
      const order_date=getFormattedDate(date);
      localStorage.removeItem("bill");
      const Products=localStorage.getItem("Products");
      localStorage.removeItem("Products");
      localStorage.removeItem("cartlength");
      await addDoc(order_collection,{user_id,user_Name,order_date,bill,Products});
      //Entering orderMap of user in User Collection;
      const u_id=JSON.parse(localStorage.getItem('curruser')).id;
      const OrderMap=JSON.parse(localStorage.getItem('OrderMap'));
      const tar_user=doc(db,"Users",u_id);
      await updateDoc(tar_user,{OrderMap:OrderMap});

      



    }

  return (
    <div >
       
      <div className='check-container'>
      <div class="price">
        <b><h2>Confirm Your Payment Your bill is {bill}</h2></b>
      
    </div>
        <div className='Payment'>
          <div className='cart-item'>
          <div class="left">
                    
                    <input id="pp" type="radio" name="payment" value="Paypal" />
                      
                     
                      <label for="pp">Paypal</label>
                  </div>
                  <div id="paypal">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png" alt="paypal" width={30} height={30}/>
                  </div>
             
          </div>
          <div className='cart-item'>
          <div class="left">
                    <input id="cd" type="radio" name="payment" />
                   
                    <div>Debit/CreditCard</div>
                </div>
                <div id="Card">
                    <img src="data:image/png;base64,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" alt="visa" width={30} height={30}/>
                    <img src="https://e7.pngegg.com/pngimages/257/159/png-clipart-hdfc-logo-thumbnail-bank-logos.png" alt="mastercard" height={30} width={30}/>
                    <img src="data:image/png;base64,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" alt="amex" height={30} width={30}/>
                    <img src="data:image/png;base64,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" alt="maestro" height={30} width={30}/>
                </div>
          </div>

          <div className='cart-item'>
             <div className='CD'> Enter Card No</div>
             <input  className="ip" type='text'/>
          </div>

          <div className='cart-item'>
          <div class="left">
                    <label for="expiry-date">Expiry</label>
                    <select id="expiry-date">
                        <option>MM</option>
                        <option value="1">01</option>
                        <option value="2">02</option>
                        <option value="3">03</option>
                        <option value="4">04</option>
                        <option value="5">05</option>
                        <option value="6">06</option>
                        <option value="7">07</option>
                        <option value="8">08</option>
                        <option value="9">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    <span>/</span>
                     <select id="expiry-date">
                        <option>YYYY</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                    </select>
                </div>
                <div class="right">
                    <label for="cvv">CVC/CVV</label>
                    <input type="text" maxlength="4" placeholder="123"/>
                    <span data-balloon-length="medium" data-balloon="The 3 or 4-digit number on the back of your card." data-balloon-pos="up"></span>
                </div>
          </div>
      
        </div>
        <div className='button'>
       
        <Link to="/Home"><button onClick={inorder}>Continue</button></Link>

        </div>
        
      </div>

    </div>
  )
}

export default Checkout
