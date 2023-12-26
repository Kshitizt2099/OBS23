import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import db from '../../../Firebase_files/Firebase_config';
import { collection,getDocs } from 'firebase/firestore';
import Book_Card from '../../Book_Card/Book_Card';
import { Logout } from '../../../User_Auth/User_Auth';
import './All_Books.css';
import Navbar from '../Navbars/Navbar';
import { click } from '@testing-library/user-event/dist/click';
import RangeSlider from '../../Price/RangeSilder';

const All_Books = (props) => {
  let initrange={
    low:0,
    high:0
  }
    const [all_books,setall_Books]=useState([]);
    const [books,setBooks]=useState([]);
    const [range,setrange]=useState(initrange);
    const [cartpro,setcart]=useState([]);
    const [render,setrender]=useState(0);
    
    useEffect(()=>{
        //collecting all books from the database.

        const book_collection=collection(db,"Books");
        const cart_collection=collection(db,"Cart");
        const get_Books=async()=>{
            const books_docs= await getDocs(book_collection);
            const allcart=await getDocs(cart_collection);
            let temp=allcart.docs.map((doc)=>{
              return {...doc.data(),pid:doc.id}
            
  
            });
            const c_id=JSON.parse(localStorage.getItem('curruser')).id;
            setcart(temp.filter((i)=>( i.userid==c_id)));

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


  const cartlength=()=>{
    return cartpro.length;
  }

  const update_cart=()=>{
    let length=cartlength()+1;
    localStorage.setItem('cartlength',length);
    setrender(render+1);
  }
  const price=()=>{
   
    let tar=[];
    if(range<300)
    {
       return;
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
  return (
    <div>
      
      <Navbar cartitems={cartlength} user={props.user} Logout={Logout} Genres={Genres} filter={filter}/>
      <div className='Main_Container'>
      <div className='Price'>
         <div>
         <h3>Genres</h3> 
         <hr className='line'/>
          <div className='Genre'>
          {Genres.map((i)=>(<p className='GenreClicks' onClick={()=>{filter(i)}}>{i}</p>))}
          </div>
           <h3>By Price Range</h3>
           <hr className='line'/>
          <div className='Genre'>
             <p>{range}+</p>
            <div className='PriceSearch'>
          
            <input type="range" value={range} min={200} max={3000} onChange={(e)=>{setrange(e.target.value)}}/>
            <div className='btn' onClick={price}>
               Go
            </div>
            
             
            </div>
                    
          </div> 
          
         </div>
      </div>
       
   
     
     
      <div className='main1'>
        <div className='row'>
        {books.map((i)=>(<Book_Card update_cart={update_cart} data={i}/>))}

        </div>
      
      </div>
      

      </div>
     
   </div>
  )
}

export default All_Books
