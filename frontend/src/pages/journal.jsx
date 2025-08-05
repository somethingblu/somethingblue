import React, {useEffect, useState} from 'react'
import twenty from '../photos/transparent/twenty.PNG'
import twentyone from '../photos/transparent/twentyone.PNG'

const Journal = () => {
  const [entry, setEntry] = useState([])
  const [form, setForm] = useState({
    entry_title: '',
    date_made: '',
    entry: ''
  })
    
          useEffect(() => {
            fetch('http://localhost:8080/api/journal', {
              method: 'GET',
              credentials: 'include'
            })
            .then((res) => {
              if (!res.ok) {
                throw new Error('Failed to fetch entry');
              }
              return res.json();
            })
            .then((data) => {
              if (Array.isArray(data)) {
                console.log(data)
                setEntry(data);
              } else {
                console.error('Invalid entry format:', data);
                setEntry([]);
              }
            })
            .catch((err) => {
              console.error('Error fetching entry:', err);
              setEntry([]);
            });
        }, []);

        const handleSubmit = async (e) => {
         e.preventDefault();

      if (!form.entry_title) {
        return alert('Need a title');
      }

      try {
        const res = await fetch('http://localhost:8080/api/journal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            entry_title: form.entry_title,
    date_made: form.date_made,
    entry: form.entry
          }),
        });

        if (!res.ok) throw new Error('Failed to submit registry item');

        const newItem = await res.json();
        setEntry([...entry, newItem]); 

        // Reset form
        setForm({ entry_title: '',
    date_made: '',
    entry: '' });
      } catch (err) {
        console.error(err);
        alert('There was an error adding the entry.');
      }
};

      const handleChange = (e) => {
         const { name, value } = e.target;
        setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
};

const handleDelete = async (id) => {
  try {
    await fetch(`http://localhost:8080/journal/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    setEntry(entry.filter((item) =>  item.id !== id));
  } catch (err) {
    console.error('Failed to delete entry:', err);
  }
};


      return (
        <div>
        <img className="main-one" src={twenty} />
        <img className="main-two" src={twentyone} />

        <div className='contacts-container'>
          <h1>Journal</h1>
          <form onSubmit={handleSubmit}>
          <input name='entry_title' value={form.entry_title} placeholder='Title' required onChange={handleChange}></input>
          <input name='date_made' value={form.date_made} placeholder='Date' type='date' required onChange={handleChange}></input>
          <textarea name='entry' value={form.entry} placeholder='Enter your thoughts here: 
1. What did you get done this week? Any feelings you want to write about.
2. Write a letter to your future self that you want to read on your wedding day.
3. Are there some people you want to thank once this is all done?
Or feel free to write your own.' required onChange={handleChange}></textarea>
<button>Submit</button>
            </form>
            </div>
            <div> 
           <ul>
                {entry.map((item, id) => (
                    <li key={id}>{
                      item.entry_title} - {item.date_made} {item.entry}
                    <button onClick={() => handleDelete(item.id)}>X</button>
                    </li>
                ))}
            </ul>
            </div>
    </div>
      );
    };

export default Journal