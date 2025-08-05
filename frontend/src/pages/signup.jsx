import React, { useState } from 'react';
import seventeen from '../photos/transparent/seventeen.PNG'
import eighteen from '../photos/transparent/eighteen.PNG'

const Signup = () => {
  const [errorText, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [budget, setBudget] = useState('');
  const [weddingDate, setWeddingDate] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'budget') setBudget(value);
    else if (name === 'wedding_date') setWeddingDate(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
          budget, 
          wedding_date: weddingDate,
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Signup failed.';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (jsonErr) {
          console.warn("Could not parse error response:", jsonErr);
        }
        setError(errorMessage);
        return;
      }

      const user = await response.json();
      console.log('User registered:', user);
    
      setName('');
      setEmail('');
      setPassword('');
      setBudget('');
      setWeddingDate('');
      
    } catch (err) {
      setError('Something went wrong during signup.');
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <img className='main-one' src={seventeen} alt="flower left" />
      <img className='main-two' src={eighteen} alt="flower right" />
      {errorText && <p className="error-message">{errorText}</p>}
      <form className="form-card" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter username"
          className="login-input"
          value={name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="login-input"
          value={email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="login-input"
          value={password}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="budget"
          placeholder="Enter budget"
          className="login-input"
          value={budget}
          onChange={handleChange}
        />
        <input
          type="date"
          name="wedding_date"
          className="login-input"
          value={weddingDate}
          onChange={handleChange}
        />
        <button type="submit" className="sign">Submit</button>
      </form>
    </div>
  );
};

export default Signup;