import React from 'react'
import { useState } from 'react';

const Review = (props) => {
    const [review,setreview]=useState("");
    const [score,setScore]=useState(0);
    const{reviewed,Addreview}=props
   
  return (
    <div>
        <p>{reviewed?"Since You Already reviewd it so current review will edit  your previous one":"you can review this product"}</p>
       <input type="text" onChange={(e)=>{setreview(e.target.value)}}/>
       <input type="text" onChange={(e)=>{setScore(e.target.value)}}/>
       <button onClick={()=>{Addreview(review,score)}}>Addreview</button>
       
    </div>
  )
}

export default Review
