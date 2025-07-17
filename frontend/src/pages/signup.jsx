import React from 'react';
import seventeen from '../photos/transparent/seventeen.PNG'
import eighteen from '../photos/transparent/eighteen.PNG'

const signup = () => {
  return (
    <div>
      <h1>sign up here</h1>
      <img className='main-one' src={seventeen}></img>
      <img className='main-two' src={eighteen}></img>
      <div> 
         <input type="text" placeholder="Enter username" className="login-input"/>
         <input type="text" placeholder="Enter name" className="login-input"/>
         <input type="text" placeholder="Enter email" className="login-input"/>
         <input type="text" placeholder="Enter password" className="login-input"/>
        <button>Submit</button>
      </div>
    </div>
  );
};

export default signup;
