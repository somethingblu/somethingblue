import React from 'react';
import cake from '../photos/bars-art/cake.png'
import drinks from '../photos/bars-art/drinks.png'
import aisle from '../photos/bars-art/aisle.png'
import three from '../photos/transparent/three.png'
import four from '../photos/transparent/four.png'
import five from '../photos/transparent/five.png'

const Dash = () => {
  return (
    <div>
      <h1>Welcome Back User! </h1>
       <img className='main-two' src={three}></img>
      <div className='user-dash'> 
        <div> 
        <p>To do list</p>
        <ul className='list-dash'>
          <ul>one</ul>
          <ul>two</ul>
          <ul>three</ul>
          <ul>four</ul>
        </ul>
        </div>

        <div> 
          <p> weather </p>
          <p>look more into getGeolocation() function to get coords and then place them into 
            https://open-meteo.com/en/docs?location_mode=csv_coordinates
          </p>
        </div>
         <img className='main-one' src={four}></img>
        <div> 
          <div> 
            <p>budget bar</p>
            <img src={cake}></img>
            <p>maybe focus on creating the art for this</p>
          </div>
          <div> 
            <p> progress bar</p>
            <img src={drinks}></img>
            <img src={aisle}></img>
            <p>maybe focus on creating the art for this</p>
          </div>
        </div>
      </div>
       <img className='main-two' src={five}></img>
    </div>
  );
};

export default Dash;
