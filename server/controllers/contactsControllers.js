const knex = require('../db/knex')

exports.getContacts = async (req, res)  => {
    const userId = req.session.userId;

    try{
        const contact = await knex ('contacts')
      .where({ user_id: userId })
      .orderBy('name'); 
    res.json(contact);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

exports.createContacts = async (req, res) => {
    const { name, vendor_type, phone_number, email, socials, address,  borough, zip, availability, notes} = req.body;
    const userId = req.session.userId

    if (!name || !vendor_type || name.trim() === '' || vendor_type.trim() === ''){
        return res.status(400).json({ error: 'Name and number are required' });
    }
  try {
    const [newContact] = await knex('contacts')
      .insert({
        name: name.trim(), 
        vendor_type: vendor_type.trim(),
        phone_number: phone_number ? phone_number.trim() : null, 
        email: email ? email.trim() : email, 
        socials: socials ? socials.trim() : null, 
        address: address ? address.trim() : null, 
        borough: borough ? borough.trim() : null, 
        zip: zip ? zip.trim() : null,
        availability: availability ? availability.trim() : null, 
        notes: notes ? notes.trim() : null, 
        user_id: userId,
      })
      .returning('*');
    
    res.status(201).json(newContact);
  } catch (err) {
    console.error('Error creating contacts:', err);
    res.status(500).json({ error: 'Failed to create contact' });
  }
};

exports.updateContacts = async (req, res) => {
  const { id } = req.params;
  const { name, vendor_type, phone_number, email, socials, address,  borough, zip, availability, notes } = req.body;
  const userId = req.session.userId;

 if (!name || !phone_number || name.trim() === ''){
        return res.status(400).json({ error: 'Name and number are required' });
    }

  try {
    const [updatedContact] = await knex('contacts')
      .where({ id, user_id: userId })
      .update({ 
        name: name.trim(), 
        vendor_type: vendor_type ? vendor_type.trim() : null, 
        phone_number: phone_number.trim(), 
        email: email.trim(), 
        socials: socials ? socials.trim() : null, 
        address: address ? address.trim() : null, 
        borough: borough ? socials.trim() : null, 
        zip: zip ? zip.trim() : null,
        availability: availability ? availability.trim() : null, 
        notes: notes ? notes.trim() : null, 
      })
      .returning('*');

    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found or access denied' });
    }

    res.json(updatedContact);
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).json({ error: 'Failed to update contact' });
  }
};


exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;

  try {
    const deleteContact = await knex('contacts')
      .where({ id, user_id: userId })
      .del();

    if (deleteContact === 0) {
      return res.status(404).json({ error: 'Contact not found or access denied' });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};