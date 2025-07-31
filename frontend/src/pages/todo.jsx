import React, { useEffect, useState } from 'react';
import six from '../photos/transparent/six.png';
import seven from '../photos/transparent/seven.png';

const Todo = () => {
  const [dragChange, setDragChange] = useState(null)
  const [input, setInput] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('on hold'); 
  const [todos, setTodos] = useState({
    'on hold': [],
    'currently': [],
    'finished': [],
  });

  useEffect(() => {
    fetch('http://localhost:8080/todos', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        const grouped = {
          'on hold': [],
          'currently': [],
          'finished': [],
        };
        console.log(data)
      if (!Array.isArray(data)) {
  console.error('Expected an array but got:', data);
  return;
}

data.forEach(todo => {
  grouped[todo.status || 'on hold'].push(todo);
});
        setTodos(grouped);
      })
      .catch(err => console.error('Fetch todos failed:', err));
  }, []);

  const handleTitleChange = (e) => setInput(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const res = await fetch('http://localhost:8080/todos', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          todo_title: input.trim(),
          content: content.trim() || null,
          status: category,
        }),
      });
      console.log('Submitting todo:', {
  todo_title: input.trim(),
  content: content.trim() || null,
  status: category,
});
      if (!res.ok) {
  const errData = await res.json();
  throw new Error(errData.message || 'Failed to add todo');
}

if  (res.ok){
  console.log('Added successfully');
}

      const newTodo = await res.json();

      setTodos(prev => ({
        ...prev,
        [category]: [newTodo, ...prev[category]],
      }));

      setInput('');
      setContent('');
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  const handleDelete = async (cat, id) => {
    try {
      await fetch(`http://localhost:8080/todos/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      setTodos(prev => ({
        ...prev,
        [cat]: prev[cat].filter(todo => todo.id !== id),
      }));
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const handleDragChange = (todo, categories) => {
    setDragChange({
      category: categories,
      id: todo.id,
    });
  }

  const handleDrag = (e) =>{
    e.preventDefault()
  }

  const handleDrop = async (e, category) => {
    e.preventDefault();
    if (!dragChange) return;
    
    const { category: oldCategory, id } = dragChange;
    if (oldCategory === category) return;

    try {
      const res = await fetch(`http://localhost:8080/todos/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: category }),
      });

      if (!res.ok){
        throw new Error ('Failed to change todo')
      }

      setTodos(prev => {
        const updatedTodos = { ...prev };
        updatedTodos[oldCategory] = updatedTodos[oldCategory].filter(todo => todo.id !== id);
        const movedTodo = prev[oldCategory].find(todo => todo.id === id);
        if (movedTodo) {
          movedTodo.status = category;
          updatedTodos[category] = [movedTodo, ...updatedTodos[category]];
        }
        return updatedTodos;
      });

      setDragChange(null);
    } catch (err) {
      console.error('Failed to update todo status:', err);
    }
}

  const formatCategoryName = (cat) => {
    if (cat === 'on hold') return 'On Hold';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <div className="todo-container">
      <img className="main-two" src={six} alt="Decoration" />
      <h4 className="heading-to">To Do</h4>

      <div className="todo-cont">
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Todo title"
            value={input}
            onChange={handleTitleChange}
            className="todo-input"
            required
          />
          <textarea
            placeholder="Content (optional)"
            value={content}
            onChange={handleContentChange}
            className="todo-textarea"
            rows="3"
          />
          <select value={category} onChange={handleCategoryChange} className="todo-select">
            <option value="on hold">On Hold</option>
            <option value="currently">Currently</option>
            <option value="finished">Finished</option>
          </select>
          <button type="submit" className="todo-button" disabled={!input.trim()}>
            Add
          </button>
        </form>
      </div>

      <div className="todo-whole">
        {Object.entries(todos).map(([cat, items]) => (
          <div key={cat} className="todo-section" onDragOver={handleDrag} onDrop={(e) => {handleDrop(e, cat)}}>
            <h3 className="to-select">
              {formatCategoryName(cat)} Todos
            </h3>
            <ul className="todo-list">
              {items.map(todo => (
                <li key={todo.id} id={todo.id} className="todo-item" draggable onDragStart={() => handleDragChange(todo, cat)}>
                  <div className="todo-content">
                    <h4 className="todo-title">{todo.todo_title}</h4>
                    {todo.content && (
                      <p className="todo-description">{todo.content}</p>
                    )}
                    <small className="todo-date">
                      {new Date(todo.date_made).toLocaleDateString()}
                    </small>
                  </div>
                  <button
                    onClick={() => handleDelete(cat, todo.id)}
                    className="delete-button"
                    aria-label={`Delete todo ${todo.todo_title}`}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <img className="main-one" src={seven} alt="Decoration" />
    </div>
  );
};

export default Todo;