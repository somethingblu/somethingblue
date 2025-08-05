import React, {useState} from "react";

const Modal  = ({isOpen, onClose}) =>{
  
  const [errorText, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [budget, setBudget] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  
  if (!isOpen){
      return null
  }

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
      const response = await fetch('http://localhost:8080/api/users/me', {
        method: 'PATCH',
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
    <div>
    <div className="modal" onClick={onClose}> 
    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>Update Your Information</h3>
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
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="login-input"
          value={password}
          onChange={handleChange}
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
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    <button className="sign" onClick={onClose}>Close</button>
    </div>
    </div>
    </div>
)
}

export default Modal;