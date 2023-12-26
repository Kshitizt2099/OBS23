import React, { useEffect } from 'react'
import './Details.css';
import { Link } from 'react-router-dom';
const Detail_Navbar = (props) => {
   
  return (
    <div className='Navbar_Detail'>
        <div className='Nav_Cart'>
        <Link to="/Cart"><img src="https://cdn-icons-png.flaticon.com/512/891/891462.png" width={40} height={40}/></Link>       
         </div>
         <div className='Number'> 
          {props.cartlength}
         </div>
       
    </div>
  )
}

export default Detail_Navbar
