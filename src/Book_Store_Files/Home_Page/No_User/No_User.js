import React from 'react'
import {Link} from 'react-router-dom';
const No_User = () => {
  return (
    <div>
        Please Login to Continue
       <Link to="/"><button>Login </button></Link>
    </div>
  )
}

export default No_User
