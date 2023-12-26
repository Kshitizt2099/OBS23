
import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import db from '../../Firebase_files/Firebase_config';
import { collection,getDocs } from 'firebase/firestore';
import Book_Card from '../Book_Card/Book_Card';
import Navbar from '../Home_Page/Navbars/Navbar';
import { Logout, get_Curr } from '../../User_Auth/User_Auth';
import './Price.css';

const Price = () => {
    const [all_books,setall_Books]=useState([]);
    const [books,setBooks]=useState([]);
    const [range,setrange]=useState(0);
    const [cartpro,setcart]=useState([]);
    const [render,setrender]=useState(0);
    const [start,setStart]=useState(false);
    const curruser=get_Curr();
    useEffect(()=>{
        //collecting all books from the database.

        const book_collection=collection(db,"Books");
        const cart_collection=collection(db,"Cart");
        const get_Books=async()=>{
            const books_docs= await getDocs(book_collection);

            const allcart=await getDocs(cart_collection);
            setcart(allcart.docs.map((doc)=>{
                   return {...doc.data(),pid:doc.id}
                 
  
            }));

            setall_Books(books_docs.docs.map((docs)=>{

            
               return {
                 ...docs.data(),id:docs.id
               };

            
            
            
            
            }
                ));
                setBooks(books_docs.docs.map((docs)=>{

            
                  return {
                    ...docs.data(),id:docs.id
                  };
            
               
               
               
               
               }
                   ));

                   if(localStorage.getItem("books")!==null)
                   {
                     const prev=JSON.parse(localStorage.getItem("books"));
                    setBooks(prev);
                   }

               
            

        }

        get_Books();
        
    },[render]);
  var Genres=[]
  for(let i=0;i<all_books.length;i++)
  {
    if(!Genres.includes(all_books[i].Genre))
    {
      Genres.push(all_books[i].Genre);
    }
    
  }
  const filter=(curr)=>{
    if(curr==="Home")
    {
      setBooks(all_books);
      localStorage.removeItem("books");
      return;
    }
    let tar=[];
    console.log(curr);
    for(let i=0;i<all_books.length;i++)
  {
    if(all_books[i].Genre==curr)
    {
      tar.push(all_books[i]);
    }
    
  }
  setBooks(tar);
 

  localStorage.setItem('books',JSON.stringify(tar));
  return;
  }
  const price=(e)=>{
    setrange(e.target.value);
    setStart(true);
    let tar=[];
    if(range<300)
    {
        setStart(false);
    }
    for(let i=0;i<all_books.length;i++)
    {
      if(all_books[i].Price<=range)
      {
        tar.push(all_books[i]);
      }
      // <input type="range" value={range} min={0} max={3000} onChange={(e)=>{price(e)}}/>
    }
    setBooks(tar);
    localStorage.setItem('books',JSON.stringify(tar));
  };

  const cartlength=()=>{
    return cartpro.length;
  }

  const update_cart=()=>{
    setrender(render+1);
  }

  return (
    <div>
    
        
      <Navbar cartitems={cartlength} user={curruser} Logout={Logout} Genres={Genres} filter={filter}/>
      
       
   
     
      <input type="range" value={range} min={200} max={3000} onChange={(e)=>{price(e)}}/>
      <div className='main1'>
        <div className='row'>
        {start===true?books.map((i)=>(<Book_Card update_cart={update_cart} data={i}/>)):""}

        </div>
    </div>
    </div>
  )
}

export default Price
