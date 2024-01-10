import React from 'react';
import './Navbar.css';

import { Link } from 'react-router-dom';
const Navbar = (props) => {
   const Logout=props.Logout;
   const Genres=props.Genres;
   const filter=props.filter;
  return (
    <nav style={{ backgroundColor: 'black', color: 'white' }}>
      <ul>
      Welcome Mr.{props.user}
        <Link to="/Home"><li onClick={()=>{filter("Home")}}><a href="#">Home</a></li></Link>

        <li><Link to="/"><p onClick={Logout}>Logout</p></Link></li>  
      <li><Link to="/Cart">Cart{props.cartitems()>0?props.cartitems():""}</Link>
</li>        
 <li>
          <a href="#">Genre</a>
          <ul className="dropdown">
          {Genres.map((i)=>(<li onClick={()=>{filter(i)}}>{i}</li>))}
            
          </ul>
        </li>
        <li> <Link to="/Orders">My Orders</Link></li>
        <li><Link to="/Price">Filter_by_price</Link></li>
        <li> <Link to="/Search">Search</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;