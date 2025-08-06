import React, {useEffect, useState} from 'react'
import cake from '../photos/bars-art/cake.png'

const Bud = () => {
      const [budget, setBudget] = useState(0);
      const [expenses, setExpenses] = useState([]);
     
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
      credentials: 'include',
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
  }, []);

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount_given || 0), 0);
  const percentUsed = budget ? Math.min((totalSpent / budget) * 100, 100) : 0;
  const remaining = budget - totalSpent;

    return (
        <div className='budget-dash'>
        <div>
         <h1>Budget</h1>
            <p>Total Budget: ${budget.toFixed(2)}</p>
            <p>Spent: ${totalSpent.toFixed(2)}</p>
            <p>Remaining: ${remaining.toFixed(2)}</p>
            <p>Used: {percentUsed.toFixed(2)}%</p>
        </div>
        <div className='cake-two'>
            <div className="second-mask"  style={{ height: `${percentUsed}%` }}></div>
            <img src={cake} alt="cake" id="cake" />
            </div>
        </div>
    )

}

export default Bud;