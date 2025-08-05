import React, {useEffect, useState} from 'react'

const Trackers = () =>{
        const [form, setForm] = useState({
  registry_name: '',
  price: '',
  description: '',
  was_purchased: 'FALSE'
})
        const [gift, setGift] = useState([])
    
          useEffect(() => {
            fetch('http://localhost:8080/api/registry_list', {
              method: 'GET',
              credentials: 'include'
            })
            .then((res) => {
              if (!res.ok) {
                throw new Error('Failed to fetch registry');
              }
              return res.json();
            })
            .then((data) => {
                console.log(data)
              if (Array.isArray(data)) {
                setGift(data);
              } else {
                console.error('Invalid registry format:', data);
                setGift([]);
              }
            })
            .catch((err) => {
              console.error('Error fetching registry:', err);
              setGift([]);
            });
        }, []);


        console.log(form)

      const handleSubmit = async (e) => {
         e.preventDefault();

      if (!form.registry_name) {
        return alert('Item name');
      }

      try {
        const res = await fetch('http://localhost:8080/api/registry_list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            registry_name: form.registry_name,
            price: Number(form.price),
            description: form.description,
            was_purchased: form.was_purchased,
          }),
        });

        if (!res.ok) throw new Error('Failed to submit registry item');

        const newItem = await res.json();
        setGift([...gift, newItem]); 

        // Reset form
        setForm({ registry_name: '',
      price: '',
      description: '',
      was_purchased: 'FALSE' });
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
    await fetch(`http://localhost:8080/registry_gift/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    setGift(gift.filter((item) =>  item.id !== id));
  } catch (err) {
    console.error('Failed to delete item:', err);
  }
};
    
    return (
            <div className='registry-section'>
            <h1>Track your gift registry here!</h1>
            <form onSubmit={handleSubmit}>
                <input name='registry_name' value={form.registry_name} placeholder='Item Name' onChange={handleChange}></input>
                <input name='price' value={form.price} placeholder='Price' onChange={handleChange}></input>
                <input name='description'  value={form.description} placeholder='description' onChange={handleChange}></input>
                <p>Has it been purchased?</p>
                    <label>
                 <input type="radio" name="was_purchased" value="TRUE" checked={form.was_purchased === 'TRUE'} onChange={handleChange} />
                    Yes
                </label>
                <label>
                <input type="radio" name="was_purchased" value="FALSE" checked={form.was_purchased === 'FALSE'} onChange={handleChange} />
                    No
                </label>
                <button>Submit</button>
            </form>
            <h1>Current Registry List:</h1>
         <ul>
  {gift.map((item) => (
    <li key={item.id}>
      {item.registry_name || '[No Name]'} - ${item.price} {item.was_purchased ? '(Purchased)' : ''}
      <button onClick={() => handleDelete(item.id)}>X</button>
    </li>
  ))}
</ul>
            </div>
    )
}

export default Trackers