const knex = require('../db/knex')

exports.getCalender = async (req, res)  => {
    const userId = req.session.userId;

    try{
        const calender = await knex ('calender')
        .where({ user_id: userId })
        .orderBy('date_due'); 
        res.json(calender);
    } catch (err) {
        console.error('Error fetching calender:', err);
        res.status(500).json({ error: 'Failed to fetch calendar' });
     }
};

exports.createCalender = async (req, res) => {
    const { event_name, date_due, repeated, desciption } = req.body;
    const userId = req.session.userId

    if (!event_name || !date_due || event_name.trim() === '' || date_due.trim() === ''){
        return res.status(400).json({ error: 'Event name and date are required' });
    }
  try {
    const [newCalender] = await knex('calender')
      .insert({
        event_name,
        date_due,
        repeated,
        desciption, 
        user_id: userId,
      })
      .returning('*');
    
    res.status(201).json(newCalender);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

exports.updateCalender = async (req, res) => {
  const { id } = req.params;
  const { event_name, date_due, repeated, desciption } = req.body;
  const userId = req.session.userId;

 if (!event_name || !date_due || event_name.trim() === ''){
        return res.status(400).json({ error: 'Event name and date due are required' });
    }

  try {
    const [updatedCalender] = await knex('calender')
      .where({ id, user_id: userId })
      .update({ 
        event_name, 
        date_due, 
        repeated, 
        desciption
      })
      .returning('*');

    if (!updatedCalender) {
      return res.status(404).json({ error: 'Calendar event not found or access denied' });
    }

    res.json(updatedCalender);
  } catch (err) {
    console.error('Error updating calendar:', err);
    res.status(500).json({ error: 'Failed to update calendar' });
  }
};


exports.deleteCalender = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;

  try {
    const deleteCalender = await knex('calender')
      .where({ id, user_id: userId })
      .del();

    if (deleteCalender === 0) {
      return res.status(404).json({ error: 'Calendar not found or access denied' });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting calendar:', err);
    res.status(500).json({ error: 'Failed to delete calendar' });
  }
};