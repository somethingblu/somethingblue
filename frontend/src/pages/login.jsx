import React from 'react';
import { useNavigate } from 'react-router-dom'
import fourteen from '../photos/transparent/fourteen.PNG'
import sixteen from '../photos/transparent/sixteen.PNG'

const Login = () => {
  // using the Navigation hook hehe ^.^
  const nav = useNavigate()

    //making our on click function 
  const handleClick  = () => {
    // we are navigating to this page 
    // its not working rn so i need to figure this out 
      nav('/signup')
  }

  return (
    <div>
      <img className='main-two' src={fourteen}></img>
      <h1> log in here </h1>

      <div> 
        <input type="text" placeholder="Enter username" className="login-input"/>
        <input type="text" placeholder="Enter password" className="login-input"/>
        <button>Login</button>
        <button  onClick={handleClick}>Not a user? Click here to sign up</button>
      <img className='main-one' src={sixteen}></img>
      </div>
    </div>
  );
};

export default Login;
