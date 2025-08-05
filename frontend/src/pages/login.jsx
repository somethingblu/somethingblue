import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import fourteen from '../photos/transparent/fourteen.PNG';
import sixteen from '../photos/transparent/sixteen.PNG';
import CurrentUserContext from '../context/current-user-context'; // update path

const loginUser = async ({ name, password }) => {
  
  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      // ensures cookies are sent and recieved with the request !!!
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return [null, { message: data.message || 'Login failed' }];
    }

    return [data, null];
  } catch (err) {
    return [err, { message: 'Network error. Please try again.' }];
  }
};

const Login = () => {
  const nav = useNavigate();
  const [errorText, setErrorText] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  if (currentUser) return <Navigate to={`/Dashboard`} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorText('');

    const [user, error] = await loginUser ({ name, password });
    if (error) {
      return setErrorText(error.message);
    }

    //after making sure it is a good log in we save it correctly 
    setCurrentUser(user);
    nav(`/Dashboard`);
  };

  const handleClick = () => {
    nav('/signup');
  };

  return (
    <div className="login-container">
      <img className='main-two' src={fourteen} alt="flower top right" />
      <h1>Log In Here</h1>

      <form onSubmit={handleSubmit} className="form-card">
        <input 
          type="text" 
          placeholder="Enter username" 
          className="login-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Enter password" 
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {errorText && <div className="error-message">{errorText}</div>}
        
        <button type="submit" className="sign">Login</button>
        <button type="button" onClick={handleClick} className="link-btn">
          Not a user? Click here to sign up
        </button>

        <img className='main-one' src={sixteen} alt="flower bottom left" />
      </form>
    </div>
  );
};

export default Login;
