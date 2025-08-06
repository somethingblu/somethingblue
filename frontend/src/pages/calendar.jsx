import React, {useEffect, useState} from 'react'
import four from '../photos/transparent/four.png'
import twentytwo from '../photos/transparent/twentytwo.PNG'
import Cal from 'react-calendar'

const Calendar = () => {
    const [form, setForm] = useState({
      event_name: '',
      date_due: '',
      desciption: '',
    })
    const [events, setEvents] = useState([])
    
          useEffect(() => {
            fetch('http://localhost:8080/api/calendar', {
              method: 'GET',
              credentials: 'include'
            })
            .then((res) => {
              if (!res.ok) {
                throw new Error('Failed to fetch events');
              }
              return res.json();
            })
            .then((data) => {
              if (Array.isArray(data)) {
                console.log(data)
                setEvents(data);
              } else {
                console.error('Invalid event format:', data);
                setEvents([]);
              }
            })
            .catch((err) => {
              console.error('Error fetching events:', err);
              setEvents([]);
            });
        }, []);

              const handleSubmit = async (e) => {
         e.preventDefault();

      if (!form.event_name) {
        return alert('Item name');
      }

      try {
        const res = await fetch('http://localhost:8080/api/calendar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            event_name: form.event_name,
      date_due: form.date_due,
      desciption: form.desciption,
          }),
        });

        if (!res.ok) throw new Error('Failed to submit registry item');

        const newItem = await res.json();
        setEvents([...events, newItem]); 

        // Reset form
        setForm({ event_name: '',
      date_due: '',
      desciption: '', });
      } catch (err) {
        console.error(err);
        alert('There was an error adding the item.');
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
    await fetch(`http://localhost:8080/calendar/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    setEvents(events.filter((item) =>  item.id !== id));
  } catch (err) {
    console.error('Failed to delete item:', err);
  }
};

    return (
            <div>
            <img className="main-two" src={four} />
            <img className="main-one" src={twentytwo} />
    
            <div className='cal-container'>
              <h1>Calendar</h1>
              <div className='dates'>
                <div>
                <Cal />
                 <h1>Upcoming:</h1>
                    <ul>
                {events.map((item, id) => (
                    <li key={id}>{item.event_name} - {item.date_due} {item.desciption}
                    <button onClick={() => handleDelete(item.id)}>X</button>
                    </li>
                ))}
            </ul>
                </div>
                <div className='name-date'>
                    <h1>Important Dates:</h1>
                    <div> 
                        <form onSubmit={handleSubmit}>
                            <input value={form.event_name} name='event_name' placeholder='Event Name'required onChange={handleChange}></input>
                            <br></br>
                            <p>Enter Start Date:</p>
                            <input name='date_due' value={form.date_due} onChange={handleChange} type='date'required></input>
                            {/* <p>Enter End Date:</p>
                            <input type='date' placeholder='Enter end date'required></input> */}
                            <textarea name='desciption' type='text' value={form.desciption} onChange={handleChange} placeholder='Notes'></textarea>
                            <button>Submit here</button>
                        </form>
                    </div>
                </div>
                </div>
                </div>
        </div>
          );
}

export default Calendar;