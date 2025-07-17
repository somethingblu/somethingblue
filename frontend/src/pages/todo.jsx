import React, { useState } from 'react';
import six from '../photos/transparent/six.png'
import seven from '../photos/transparent/seven.png'

const Todo = () => {
  // our input coming in, used to update our input
  const [input, setInput] = useState('');
  //the category it will be going in, holds our 'current' selection
  const [category, setCategory] = useState('Hold');
  //we will have 3 dif categories, lets us update our array when we add sooemthing
  const [todos, setTodos] = useState({
    Hold: [],
    Currently: [],
    Finished: [],
  });

  //on change of our box
  const handleChange = (e) => {
    //setting our new input as whatever is typed into our box
    setInput(e.target.value);
  };

  //when we change the category in the drop down
  const handleCategoryChange = (e) => {
    //we are setting our new category as whatever we select 
    setCategory(e.target.value);
  };

  //when we submit the form
  const handleSubmit = (e) => {
    //we are preventing our page from refreshing  
    e.preventDefault();

    //if we have empty spaces we wont add it to our to do list 
    if (!input.trim()) return;

    //gives the todo its own id
    const newTodo = {
      //since 100000 is a huge number it will be fr random
      id: Math.floor(Math.random() * 100000),
      text: input.trim()
    };

    //updates EVERYTHING
     setTodos(prev => ({
      //we will keep everything we had prior
      ...prev,
      //we will add anything new to our todo list category
      [category]: [newTodo, ...prev[category]]
    }));

    //clears once the text is submitted, refreshes it fr 
    setInput('');
  };

  //DELETIOOOOON (category, id), we have to delete once the button is pressed 
  const handleDelete = (cat, id) => {
    setTodos(prev => ({
      ...prev,
      //in the categories we will filter for the exact id 
      //and delete the to do that has the same id :D
      [cat]: prev[cat].filter(todo => todo.id !== id)
    }));
  };

  //where all the fun actually starts 
  return (
    // our main container is here 
    <div className="todo-container">
      <img className='todo-one' src={six}></img>
      {/* our tiny header  */}
      <h4 className='heading-to'>To Do</h4>
      {/* onSubmit our handleSubmit (aka preventing the auto refresinng)
      wont take place */}
      <div className='todo-cont'>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div>
        {/* Here is where the bar is, where we will get our to do item */}
        <input 
          type="text" 
          placeholder="Add a to do" 
          // the input we are takiing
          value={input} 
          //handleChange which will set our new input as the answer we put in
          onChange={handleChange}
          className="todo-input"
        />
        </div>


        <div>
        {/* our category selection!! */}
        <select value={category} onChange={handleCategoryChange} className="todo-select">
          {/* our choices */}
          <option value="Hold">On Hold</option>
          <option value="Currently">Currently</option>
          <option value="Finished">Finished</option>
        </select>
        {/* our submit button */}
        </div>

        <div>
        <button type="submit" className="todo-button">Add</button>
        </div>
      </form>
      </div>

<div className='todo-whole'>
  {Object.entries(todos).map(([cat, items]) => (
    <div key={cat} className="todo-section">
        <h3 className='to-select'>
          {cat.charAt(0).toUpperCase() + cat.slice(1)} Todos
        </h3>
        <ul className="todo-list">
          {items.map(todo => (
            <li key={todo.id} className="todo-item">
              {todo.text}
              <button
                onClick={() => handleDelete(cat, todo.id)}
                className="delete-button"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
  ))}
</div>
 <img className='main-one' src={seven}></img>
</div>
  )}


export default Todo;