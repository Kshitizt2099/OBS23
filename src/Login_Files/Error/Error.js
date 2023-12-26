import React from 'react';
import './Error.css';
import { Link, useParams } from 'react-router-dom';
const Error = () => {
    let {msg,path}=useParams();
    if(path==="Login")
    {
        path=""
    }
  return (
    <div className='Error_Body'>
        <div className="error-container">
        <img className="error-image" src="https://img.freepik.com/free-vector/warning-concept-illustration_114360-1551.jpg?w=740&t=st=1691137314~exp=1691137914~hmac=e90e0f096db0a96b131a65b1b4f70b8a22b7abae910dda27700407ac794119ac" alt="Error Illustration"/>
        <div className="error-code">404</div>
        <div className="error-message">
            {msg}</div>
        <Link to={`/${path}`}>Go back to the homepage</Link>
    </div>
      
    </div>
  )
}

export default Error
