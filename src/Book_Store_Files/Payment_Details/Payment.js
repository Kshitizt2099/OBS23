import React from 'react'
import "./Payment.css"
const Payment = () => {
  return (
    <div>
        
        <div className='Create_Body'>
       <div className="create-container">
    <h1>Entering Card Details</h1>
    <form>
        
        <input className='Field' type="text" name="name" placeholder="Username" required/>
       
        <input className='Field' type="email" name="email" placeholder="email" required/>
        <input className='Field' type="password" name="password" />
        <input className="submit" type="submit" value="Create"/>
    </form>
</div>
      
    </div>
    </div>
  )
}

export default Payment
