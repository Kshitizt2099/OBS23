import React, { useState } from 'react';
import './Range.css';
const RangeSlider = (props) => {
  const [low, setlow] = useState(50);
  const [high, sethigh] = useState(50);
  const{price}=props
  const handleSlider1Change = (event) => {
    setlow(event.target.value);
    price(high,event.target.value);
  };

  const handleSlider2Change = (event) => {
    
    sethigh(event.target.value);
    price(event.target.value,low);
  };
  const sliderStyle = {
    backgroundImage: `url('https://cdn-icons-png.flaticon.com/512/5610/5610918.png')`, // Replace 'image.png' with your image path
    left: `calc(${(low - 1) * 100 / 99}% - 10px)`, // Adjust positioning as needed
  };
  
  return (
    <div>
      <div>
        low:{low} high:{high}
        <div class="range-container">
        
        <input
          type="range"
          min={0}
          max={3000}
          value={low}
          onChange={handleSlider1Change}
          className='range low'
        />
         <div className="low-image" style={sliderStyle}></div>
       
        <div>
       
        <input
          type="range"
          min={0}
          max={3000}
          value={high}
          onChange={handleSlider2Change}
          className='range high'
        />
          
      </div>
     
  
</div>
      

      </div>
    </div>
  );
};

export default RangeSlider;