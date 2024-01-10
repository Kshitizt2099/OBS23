import React from 'react'
import './Error.css'
import { Link, useParams } from 'react-router-dom'

const Success = () => {
    let {msg,path}=useParams();
    if(path==="Login")
    {
        path=""
    }
  return (
    <div className='Error_Body'>
        <div className="error-container">
        <img class="error-image" src="https://img.freepik.com/premium-vector/check-mark-icon-flat-style-ok-accept-vector-illustration-white-isolated-background-tick-business-concept_157943-544.jpg?w=740"/>
        
        <div className="error-message">
             {msg}</div>
            <Link to={`/${path}`}>Go back to the homepage</Link>
    </div>
      
    </div>
  )
}

export default Success
