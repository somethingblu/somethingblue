import React from 'react';
import twelve from '../photos/transparent/twelve.PNG'
import thirteen from '../photos/transparent/thirteen.PNG'

const contacts = () => {
  return (
    <div>
      <h1>contacts</h1>
      <p>a | b | c | d | e | f | g | h | i | j | k | l | m | n | o | p | q | r | s | t | u | v | w | x | y | z </p>
      <img className='main-one' src={twelve}></img>
      <img className='main-two' src={thirteen}></img>
    </div>
  );
};

export default contacts;
