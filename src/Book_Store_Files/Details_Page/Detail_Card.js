import React from 'react'
import './Details.css'
const Detail_Card = (props) => {
    const data=props.data;
 
  return (
    <div>
      <div className='Image'>
         <img src={data.Image}/>
        </div>

    </div>
  )
}

export default Detail_Card
