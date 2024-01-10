
import Login from './Login_Files/Login'
import Home from './Book_Store_Files/Home_Page/Home'
import Cart from './Book_Store_Files/Cart/Cart'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Checkout from './Book_Store_Files/Cart/Checkout'
import Details from './Book_Store_Files/Details_Page/Details'
import Order from './Book_Store_Files/Orders/Order'
import Price from './Book_Store_Files/Price/Price'
import { useEffect } from 'react'
import db from './Firebase_files/Firebase_config'
import { collection,getDocs } from 'firebase/firestore'
import Search from './Book_Store_Files/Search/Search'
import Error from './Login_Files/Error/Error'
import Create from './Login_Files/Create/Create'
import Success from './Login_Files/Error/Success'
import Payment from './Book_Store_Files/Payment_Details/Payment'
import Check from './Book_Store_Files/Checkout/Check'

const App = () => {
 



  return (
    
     
      <Routes>
         <Route exact path="/" element={<Login/>}/>
         <Route exact path="/Home" element={<Home/>}/>
         <Route exact path="/Cart" element={<Cart/>}/>
         <Route exact path="/Details/:id" element={<Details/>}/>
         <Route exact path="/CheckOut" element={<Check/>}/>
         <Route exact path="/Orders" element={<Order/>}/>
         <Route exact path="/Price" element={<Price />}/>
         <Route exact path="/Search" element={<Search />}/>
         <Route exact path="/Error/:msg/:path" element={<Error />}/>
         <Route exact path="/Create" element={<Create/>} />
         <Route exact path="/Success/:msg/:path" element={<Success/>} />
         <Route exact path="/Payment" element={<Payment/>} />
         <Route exact path="/FinalCheckOut" element={<Checkout/>} />

       </Routes>
      
      
 
       
      
      
    
  )
}

export default App
