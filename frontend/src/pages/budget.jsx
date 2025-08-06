import React, { useEffect, useState } from 'react';
import cake from '../photos/bars-art/cake.png';
import eight from '../photos/transparent/eight.png';
import nine from '../photos/transparent/nine.png';

const Budget = () => {
  const [contact, setContact] = useState([])
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ label: '', price: '', amount_given: '', contact_id: '' });

  useEffect(() => {
  fetch('http://localhost:8080/api/auth/me', {
    method: 'GET',
    credentials: 'include',
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch user');
      return res.json();
    })
    .then(user => {
      if (user.budget) {
        setBudget(Number(user.budget));
      }
    })
    .catch(err => {
      console.error('Error fetching user info', err);
    });

  fetch('http://localhost:8080/api/budget', {
    method: 'GET',
    credentials: 'include'
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch budget items');
      return res.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        setExpenses(data);
      } else {
        console.error('Invalid budget format:', data);
        setExpenses([]);
      }
    })
    .catch(err => {
      console.error('Error fetching budget items', err);
      setExpenses([]);
    });

    fetch('http://localhost:8080/api/contacts',{
      method: 'GET',
      credentials: 'include',
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to get contact')
        return res.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        setContact(data)
      } else {
        setContact([])
      }
    })
    .catch(err => {
      console.error('Error fetching contact', err)
      setContact([])
    })
}, []);


  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount_given || 0), 0);
  const percentUsed = budget ? Math.min((totalSpent / budget) * 100, 100) : 0;

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!newExpense.label) return;
    
    try {
      const res = await fetch('http://localhost:8080/api/budget', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label: newExpense.label.trim(),
        price: Number(newExpense.price),
        amount_given: Number(newExpense.amount_given),
        contact_id: newExpense.contact_id,
      })
    });
      if (!res.ok){
        throw new Error('Failed to fetch budget items')
      }
        const savedExpense = await res.json();
        setExpenses([...expenses, savedExpense])
        setNewExpense({label: '', price: '', amount_given: '', contact_id: ''})
      } catch (err) {
        console.error('Error adding budget item', err)
      }
    };

    const handleDeleteExpense = async (id) => {
  try {
    const res = await fetch(`http://localhost:8080/api/budget/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to delete expense');
    
    setExpenses(expenses.filter((expense) => expense.id !== id));
  } catch (err) {
    console.error('Error deleting expense:', err);
  }
};


  return (
    <div>
      <br></br>
    <div className='budget-layout'>
      <div className="form">
        <h1>Total Budget: ${Number(budget.toFixed(2))}</h1>
        <form onSubmit={handleAddExpense}>
          <select className='select-value' value={newExpense.contact_id} onChange={(e) => setNewExpense({...newExpense, contact_id: e.target.value })} required>
          <option value="" >Select a Contact</option>
          {contact.map((contacts) => (
            <option key={contacts.id} value={contacts.id}> {contacts.name} ({contacts.vendor_type})</option>
          ))}
          </select>
          <input
            type="text"
            placeholder="Expense name"
            value={newExpense.label}
            onChange={(e) => setNewExpense({ ...newExpense, label: e.target.value })}
          />
          <input
            type="number"
            placeholder="Total Amount"
            value={newExpense.price}
            onChange={(e) => setNewExpense({ ...newExpense, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount given"
            value={newExpense.amount_given}
            onChange={(e) => setNewExpense({ ...newExpense, amount_given: e.target.value })}
          />
          <button type="submit">Add Expense</button>
        </form>
      </div>
      
      <div className="cake-container">
        <div className='cake-one'>
        <div
          className="cake-mask"
          style={{ height: `${percentUsed}%` }}
        ></div>
        <img src={cake} alt="cake" className="cake" />
      </div>
      <div>
      <p>Spent: ${Number(totalSpent.toFixed(2))} / ${Number(budget.toFixed(2))}</p>
      </div>
      <div className='dates'> 
        <ul>
        {expenses.map((e, ind) => (
          <li key={ind}>
            {e.label}:${Number(e.amount_given || 0).toFixed(2)} / ${Number(e.price || 0).toFixed(2)}
            <button onClick={() => handleDeleteExpense(e.id)} className='delete-button'>X</button>
          </li>
        ))}
        </ul>
      </div>
      </div>
      </div>

      <img className="main-two" src={eight} alt="decor 2" />
      <img className="main-one" src={nine} alt="decor 1" />
    </div>
  );
};

export default Budget;
