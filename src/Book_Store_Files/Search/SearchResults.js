import React from 'react'
import Book_Card from '../Book_Card/Book_Card';

const SearchResults = (props) => {
    const {res,update_cart}=props;
  return (
    <div>
       {res.length>0?res.map((i)=><Book_Card update_cart={update_cart} data={i}/>):"Nothing Found "}
    </div>
  )
}

export default SearchResults
