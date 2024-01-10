import React, { useState,useEffect} from 'react'
import db from '../../Firebase_files/Firebase_config';
import { collection,getDocs } from 'firebase/firestore';
import './search.css';
import { Link, Navigate } from 'react-router-dom';

 
const Search = () => {
    const [books,setBooks]=useState([]);
    const [search,setsearch]=useState("");
    const[entered,setentered]=useState(0);
    const[searchres,setres]=useState([]);
    const [choice,setchoice]=useState([]);
    const[options,setOptions]=useState([]);
    useEffect(()=>{
        //collecting all books from the database.
        setOptions(["By Book Name","By Author Name"])
        localStorage.removeItem('books');
        
        const book_collection=collection(db,"Books");
        
        const get_Books=async()=>{
            const books_docs= await getDocs(book_collection);
           
          
         
            

           
           
                setBooks(books_docs.docs.map((docs)=>{

            
                  return {
                    ...docs.data(),id:docs.id
                  };
            
               
               
               
               
               }
                   ));

                  

               
            

        }

        get_Books();
        
    },[]);
        
   
    const searchfn=()=>{

        
      if(choice==="By Book Name")
       {
        const ans=(books.filter((i)=>i.Name.includes(search)))
        
        localStorage.setItem('books',JSON.stringify(ans));
        setres(ans);
       
       setentered(true);
      
       }
       else if(choice==="By Author Name")
       {
        const ans=(books.filter((i)=>i.Author.includes(search)))
        
        localStorage.setItem('books',JSON.stringify(ans));
        setres(ans);
       
       setentered(true);
       }
        

    }
   
   console.log("redeb")
    
  return (
    <div>
       <div className="dropdown">
      <select
        value={"abc"}
        onChange={(e) =>{ setchoice(e.target.value)}}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p>Selected option: {choice}</p>
    </div>
       
      <div>
  
      <form>
        <input type='text' onChange={(e)=>{setsearch(e.target.value);}}/>
        <button type='button' onClick={searchfn}>Search</button>
         {searchres.length>0 ?<Navigate to="/home"/>:entered===true?"Nothing Found":""}
      </form>
    </div>
    </div>
    
  )
}

export default Search
