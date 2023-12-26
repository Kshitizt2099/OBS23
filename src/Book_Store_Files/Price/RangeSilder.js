import React, { useState } from 'react';

const RangeSlider = () => {
  const [value1, setValue1] = useState(50);
  const [value2, setValue2] = useState(50);

  const handleSlider1Change = (event) => {
    setValue1(event.target.value);
  };

  const handleSlider2Change = (event) => {
    setValue2(event.target.value);
  };

  return (
    <div>
      <div>
        <label>Slider 1</label>
        <input
          type="range"
          min={0}
          max={100}
          value={value1}
          onChange={handleSlider1Change}
        />
        <p>Value 1: {value1}</p>
      </div>
      <div>
        <label>Slider 2</label>
        <input
          type="range"
          min={0}
          max={100}
          value={value2}
          onChange={handleSlider2Change}
        />
        <p>Value 2: {value2}</p>
      </div>
    </div>
  );
};

export default RangeSlider;