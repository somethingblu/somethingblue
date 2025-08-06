import React, { useEffect, useState } from 'react';
import twenty from '../photos/transparent/twenty.PNG';
import twentyone from '../photos/transparent/twentyone.PNG';
import Cloud from '../components/cloud.jsx';

const Journal = () => {
  const [entry, setEntry] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [form, setForm] = useState({
    entry_title: '',
    date_made: '',
    entry: ''
  });

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
          console.log(data);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.entry_title) {
      return alert('Need a title');
    }

   let fullEntry = form.entry;
if (imageUrl) {
  fullEntry += `\n\n[Image uploaded](${imageUrl})`;
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
          entry: fullEntry,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit journal entry');

      const newItem = await res.json();
      setEntry([...entry, newItem]);

      // Reset form and image
      setForm({ entry_title: '', date_made: '', entry: '' });
      setImageUrl('');
    } catch (err) {
      console.error(err);
      alert('There was an error adding the entry.');
    }
  };

  const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:8080/api/journal/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.ok) {
      setEntry(prev => prev.filter(item => item.id !== id));
      console.log('Deleting journal with id:', id, 'for user:', res)
    } else if (res.status === 404) {
      alert('Entry not found or you do not have permission to delete it.');
    } else {
      const text = await res.text();
      console.error('Delete failed:', text);
    }
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
          <input
            name='entry_title'
            value={form.entry_title}
            placeholder='Title'
            required
            onChange={handleChange}
          />
          <input
            name='date_made'
            value={form.date_made}
            placeholder='Date'
            type='date'
            required
            onChange={handleChange}
          />
          <textarea
            name='entry'
            value={form.entry}
            placeholder={`Enter your thoughts here:\n1. What did you get done this week? Any feelings you want to write about.\n2. Write a letter to your future self that you want to read on your wedding day.\n3. Are there some people you want to thank once this is all done?\nOr feel free to write your own.`}
            required
            onChange={handleChange}
          ></textarea>
          <Cloud onUpload={setImageUrl} />
          <div className='botom'>
          <button className='submit-button'>Submit</button>
          </div>
        </form>
      </div>

  <div className="journal-grid">
  {entry.map((item, id) => (
    <div key={id} className="journal-card">
      <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(item.id);}}> × </button>

      
      {item.entry.includes('cloudinary.com') && (
        <img
          src={item.entry.match(/https:\/\/res\.cloudinary\.com\/[^\s)]+/g)?.[0]}
          alt="Journal Upload"
          className="journal-image"
        />
      )}
      
      <h3>{item.entry_title}</h3>
      <p className="journal-date">
        {new Date(item.date_made).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
       <p>
        {item.entry.replace(/(\[IImage uploaded\]\(\)\s*)?https:\/\/res\.cloudinary\.com\/[^\s)]+/g, '')}
      </p>
    </div>
  ))}
</div>
    </div>
  );
};

export default Journal;
