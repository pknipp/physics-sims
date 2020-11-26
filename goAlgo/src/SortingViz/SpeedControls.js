import React, { useState, useEffect } from 'react';

export default function Slider({ SPEED, NUM_BARS }) {
  let [speed, setSpeed] = useState(SPEED)
  const handleChange = (e) => {
    setSpeed(e.target.value)
  }

  return (
    <div className="slidecontainer">
      <input onChange={handleChange} type="range" min="1" max="300" value={speed} className="slider" id="myRange" />
    </div>
  )
}
