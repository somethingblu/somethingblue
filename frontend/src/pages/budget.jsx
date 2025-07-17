import React from 'react';
import cake from '../photos/bars-art/cake.png'
import eight from '../photos/transparent/eight.png'
import nine from '../photos/transparent/nine.png'

const budget = () => {
  return (
    <div>
      <h1>budget</h1>
      <img src={cake}></img>
      <img className='main-two' src={eight}></img>
      <img className='main-one' src={nine}></img>
    </div>
  );
};

export default budget;
