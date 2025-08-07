import React from 'react';

const todoModal = () => {

return (
       <div className="todo-container">
    
          <div className="todo-cont">
          <h1 className="heading-to">To Do</h1>
            <form onSubmit={handleSubmit}>
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
          </div>
          )  
}

export default todoModal;