import React, {useEffect, useState } from 'react'

import db from '../../Firebase_files/Firebase_config';
import { collection,addDoc,getDocs, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Book_Card = (props) => {
    const[can,setcan]=useState(true);//for checking whether element can be adde d in cart or not
    const[update_card,set_update]=useState(0);
    const books=props.data;
    const update_cart=props.update_cart;
    useEffect(()=>{
      const cart_collection=collection(db,"Cart");
      const get_Books=async()=>{

          let cart;
          const allcartelements=await getDocs(cart_collection);
          /*cart=allcartelements.docs.map((doc)=>{
                return {...doc.data(),pid:doc.id}
              
 
  
        
             } )*/
             let temp=allcartelements.docs.map((doc)=>{
              return {...doc.data(),pid:doc.id}
            
  
            });
            const c_id=JSON.parse(localStorage.getItem('curruser')).id;
            cart=temp.filter((i)=>( i.userid==c_id));
          let to_add=true;
          for(let i=0;i<cart.length;i++)
          {
              if(cart[i].id===books.id)
              {
                 to_add=false;
                 setcan(to_add);
                
                 return;
              }
          }
    
    
    
    
    
                  }
    
        get_Books();
    
    },[update_card]);
    const add=()=>{
      console.log(books.id,books.Name);
      const cart_collection=collection(db,"Cart");
      console.log(cart_collection);
     const add_cart=async()=>{
      //const product={Product_id:books.id,Qty:1,Price:books.Price,Product_Name:books.name}
      let cart;

      
        const allcartelements=await getDocs(cart_collection);
         cart=allcartelements.docs.map((doc)=>{
               return {...doc.data(),pid:doc.id}
             

 
       
            } )
         let to_add=true;
         const c_id=JSON.parse(localStorage.getItem('curruser')).id;
         for(let i=0;i<cart.length;i++)
         {
             if(cart[i].id===books.id && cart[i].userid===c_id)
             {
                to_add=false;
             }
         }
         
        if(to_add)
        {
          const userid=JSON.parse(localStorage.getItem('curruser')).id;
          console.log("IN ADD",userid);
          await addDoc(cart_collection,{Qty:1,Price:books.Price,id:books.id,Name:books.Name,userid});
          console.log("added");
          set_update(update_card+1);
      
         
          update_cart();
          return;

        }
        
        console.log("Already in Cart")
        return;
              
      
      }
     /*
      <div className='overlay'>
            <h3>Name:{books.Name}</h3>
             <h3>Genre:{books.Genre}</h3>
             <p>Desc:{books.Desc}</p>
           <button onClick={add}>Add to cart</button>
           <Link to={`/Details/${books.id}`}><button>More_Info</button></Link>

           </div>*/
      add_cart()
    }
  return (
    <div>
      <Link to={`/Details/${books.id}`}>
     <div >
     <div className='box'>
        <img src={books.Image}/>
   </div>
    

   </div>
     </Link>
     <div className='bottom'>
     <div className='Title'>
     {books.Name}
     </div>
     <div className='Details'>
      Rs {books.Price}
      <div className='Cart'>
      <img onClick={add} src={can===true?'https://cdn-icons-png.flaticon.com/512/891/891407.png':'https://cdn-icons-png.flaticon.com/512/6572/6572664.png'} height={20} width={20}/>
      </div>
      
     </div>
    
    
    </div>
    


    </div>
           
      

      
      
  
  )
}

export default Book_Card
