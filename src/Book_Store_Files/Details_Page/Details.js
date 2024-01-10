import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Detail_Card from './Detail_Card';
import { collection ,getDocs,addDoc, doc, updateDoc} from 'firebase/firestore';
import db from '../../Firebase_files/Firebase_config';
import './Details.css';
import { get_Curr,InCart } from '../../User_Auth/User_Auth';
import Navbar from '../Home_Page/Navbars/Navbar';
import Detail_Navbar from './Detail_Navbar';
import No_User from '../Home_Page/No_User/No_User';
import Review from './Review/Review';



const Details = () => {
    const [books,setall_Books]=useState([]);
    const {id}=useParams();
    
    
    const [rev_arr,set_rev_array]=useState([]);


    const [render,setrender]=useState(0);
    const [can_added,setres]=useState(true);
    const [cartlength,setcartlength]=useState(0);
    const[reviewed,setreviewed]=useState(false)


    
    useEffect(()=>{
     
   
       
      const book_collection=collection(db,"Books");
      const reviews_collection=collection(db,"Review");


      const cart_collection=collection(db,"Cart");
      const get_Books=async()=>{
        const books_docs= await getDocs(book_collection);
        setall_Books(books_docs.docs.map((docs)=>{

        
           return {
             ...docs.data(),id:docs.id
           };
 
                    }
            ));
        
          const reviews_docs=await getDocs(reviews_collection);


          set_rev_array(reviews_docs.docs.filter((docs)=>{



              if(docs.data().product_id===id) 
              {
                return{...docs.data(),id:docs.id}
              }
              
             
          }));
          const curr_user_id=JSON.parse(localStorage.getItem("curruser")).id
        
          reviews_docs.docs.forEach((docs)=>{

            if(docs.data().product_id===id && docs.data().user_id===curr_user_id) 
            {
                 setreviewed(true)

            }

          })


          let cart;
          const allcartelements=await getDocs(cart_collection);
          cart=allcartelements.docs.map((doc)=>{
                return {...doc.data(),pid:doc.id}
              
 
  
        
             } )
          let to_add=true;
          for(let i=0;i<cart.length;i++)
          {
              if(cart[i].id===data.id)
              {
                 to_add=false;
                 
                 setres(to_add);
              }
          }
    
    
    
    
    
                  }
    
        get_Books();
    
    
    
    
    
    },[render]);

    let data={};
    for(let i=0;i<books.length;i++)
    {
       if(books[i].id==id)
       {
        data=books[i];
        break;
       }
    }
    const submit=(review,score)=>{

      const curr_user_id=JSON.parse(localStorage.getItem("curruser")).id
      if(score>5)
      {
        window.alert("More than 5 Not allowed");
        return;
      }
      if(review=="")

      {
        window.alert("Empty Review Field in sumbit");

      }
      if(review.length>0)
      {
        const add_review=async()=>{

          const Review_collection=collection(db,'Review');
  
  
  
          await addDoc(Review_collection,{score,review,user_id:curr_user_id,Name:get_Curr(),product_id:id});
  
  
        }
        add_review();
  
        setrender(render+1);
      }
      
    }
    const edit=async(review,score)=>{
      console.log(review,score);
      const curr_user_id=JSON.parse(localStorage.getItem("curruser")).id
      let id=-1

      rev_arr.forEach((i)=>{
      
      if(i.data().user_id==curr_user_id){
     
           id=i.id;
          
           return;
           
       }
      })
      
      const tar_doc=doc(db,"Review",id);

      if(score>5)
      {
        window.alert("More than 5 Not allowed");
        return;
      }
      if(review=="")

      {
        window.alert("Empty Review Field in editingg");

      }
      if(review.length>0)
      {
        await updateDoc(tar_doc,{review:review,score:score});
        setrender(render+1);
      }
     

    
    }
  
    const add=()=>{
      console.log(data.id,data.Name);
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
          await addDoc(cart_collection,{Qty:1,Price:data.Price,id:data.id,Name:data.Name,userid});
          localStorage.setItem('cartlength',Number(localStorage.getItem('cartlength'))+1);
          setrender(render+1);
          return;

        }
        console.log("Already in Cart")
        return;
              
      
      }
      add_cart()
    }
  
    const OrderMap=JSON.parse(localStorage.getItem("OrderMap"));
  const bought= data.Name in OrderMap;
  return (
    <div>
                {
      localStorage.getItem('curruser')!==null? 
      <div>
      <Detail_Navbar cartlength={localStorage.getItem('cartlength')}/>
      <div className='Detail_area'>
        <div className='Image'>
            <img src={data.Image}/>
        </div>
        <div className='Detail5'>
          <div className='Title1'>
             <h1>{data.Name}</h1>
             <div className='Author'>
             <p><strong>Author:</strong> {data.Author}</p>
             </div>

             <div className='Dates'>
             <p><strong>Release Date:</strong>{data.Date}</p>
            <p><strong>Genre:</strong> {data.Genre}</p>
             </div>
            <p><strong> ₹ </strong>{data.Price}</p>
             <div className='Cart_cont'>
               <div onClick={add} className='Cart_btn'>{can_added==true?"Add to Cart":"In Cart"}</div>
             </div>
          </div>
          <div>
          
          
           
           


          </div>
       
        </div>
        <div>

        </div>
        <div className='reviews'>

          <div className='review_parent'>


          </div>
          <div className='review'>

          <h1>Reviews:</h1>

          {rev_arr.length===0?"No reviews yet":rev_arr.map((rev)=>(





<div  key={rev.data().id}>

<p><strong>{rev.data().Name}:</strong>{rev.data().review}</p>



            <p><strong>Rating:</strong> {rev.data().score}/5</p>

</div>

))}
            {bought===true?<Review reviewed={reviewed} Addreview={reviewed?edit:submit} />:"U have bought this product so u can't review it"}





          </div>
        
        </div>
      </div>
      

    </div>:<No_User/>
      
    }
    </div>
   
   
  )
}

export default Details
