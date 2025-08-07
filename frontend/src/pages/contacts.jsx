import React, { useEffect, useState } from 'react';
import twelve from '../photos/transparent/twelve.PNG'
import thirteen from '../photos/transparent/thirteen.PNG'

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    vendor_type: '',
    phone_number: '',
    email: '',
    socials: '',
    address: '',
    borough: '',
    zip: '',
    availability: '',
    notes: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/contacts', {
      method: 'GET',
      credentials: 'include'
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch contacts');
      }
      return res.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        console.error('Invalid contacts format:', data);
        setContacts([]);
      }
    })
    .catch((err) => {
      console.error('Error fetching contacts:', err);
      setContacts([]);
    });
}, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.name || !formData.vendor_type) {
    return alert('Name and vendor type are required.');
  }

  const url = editingId
    ? `http://localhost:8080/api/contacts/${editingId}`
    : 'http://localhost:8080/api/contacts';

  const method = editingId ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const saved = await res.json();

    if (editingId) {
      setContacts(contacts.map(c => c.id === editingId ? saved : c));
    } else {
      setContacts([...contacts, saved]);
    }

    setFormData({
      name: '',
      vendor_type: '',
      phone_number: '',
      email: '',
      socials: '',
      address: '',
      borough: '',
      zip: '',
      availability: '',
      notes: ''
    });

    setEditingId(null);
  } catch (err) {
    console.error('Error saving contact:', err);
  }
};

  const startEdit = (id) => {
    setEditingId(id)
    const contactEdit = contacts.find(c => c.id === id)
    if(contactEdit){
      setEditingId(id)
      setFormData(contactEdit)
    }
  };

  console.log('Contacts:', contacts);

  if (!Array.isArray(contacts)) {
  console.error('Contacts is not an array', contacts);
  return;
}
  const grouped = contacts.reduce((acc, contact) => {
    if(!contact.name || typeof contact.name !== 'string'  || contact.name.length  === 0){
      return acc
    }
    const letter = contact.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(contact);
    return acc;
  }, {});

  const handleDeleteContact = async (id) => {
  if (!window.confirm('Are you sure you want to delete this contact?')) return;

  try {
    const res = await fetch(`http://localhost:8080/api/contacts/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (!res.ok) {
      throw new Error('Failed to delete contact');
    }

    setContacts(contacts.filter((contact) => contact.id !== id));
  } catch (err) {
    console.error('Error deleting contact:', err);
  }
};

  return (
    <div className='contacts-container'>

      <div className='contact-form'>
      <h1>Contacts</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name *" required />
        <input name="vendor_type" value={formData.vendor_type} onChange={handleChange} placeholder="Vendor Type *" required />
        <input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input name="socials" value={formData.socials} onChange={handleChange} placeholder="Socials" />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
        <input name="borough" value={formData.borough} onChange={handleChange} placeholder="City" />
        <input name="zip" value={formData.zip} onChange={handleChange} placeholder="Zip" />
        <input name="availability" value={formData.availability} onChange={handleChange} placeholder="Availability" />
        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" />
        <button type="submit">{editingId ? 'Update' : 'Add'} Contact</button>
      </form>
      </div>

      <img className="main-one" src={twelve} />
      <img className="main-two" src={thirteen} />

      <div className='display-contact'>
      {Object.keys(grouped).sort().map((letter) => (
        <div key={letter} id={letter}>
          <h2>{letter}</h2>
          {grouped[letter].map((contact) => (
            <div key={contact.id}>
              <strong> -`♡´- {contact.name}</strong> •ᴗ• {contact.vendor_type}
              <div>☏ {contact.phone_number}</div>
              <div>✉︎ᯓᡣ𐭩 {contact.email}</div>
              <div>⌯⌲ {contact.socials}</div>
              <div>𖠿 {contact.address}, {contact.borough}, {contact.zip}</div>
              <div>⩇⩇:⩇⩇ {contact.availability}</div>
              <div>✐ᝰ.ᐟ {contact.notes}</div>
              <div className='contact-butts'>
              <button onClick={() => startEdit(contact.id)}>Edit</button>
                <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
                </div>
            </div>
          ))}
        </div>
      ))}
      </div>

      <div className='letter-search'>
  <ul>
    {'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('').map((letter) => (
      <ul key={letter}>
        <a href={`#${letter}`}>{letter}</a>
      </ul>
    ))}
  </ul>
</div>
    </div>
  );
};

export default ContactsPage;