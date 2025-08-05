const knex = require('../db/knex')

exports.getJournal = async (req, res)  => {
    const userId = req.session.userId;

    try{
        const journal = await knex ('journal')
        .where({ user_id: userId })
        .orderBy('date_made'); 
        res.json(journal);
    } catch (err) {
        console.error('Error fetching journal entry:', err);
        res.status(500).json({ error: 'Failed to fetch journal entry' });
     }
};

exports.createJournal = async (req, res) => {
    const { entry_title, date_made, entry } = req.body;
    const userId = req.session.userId

    if (!entry_title || !date_made || entry_title.trim() === '' || date_made.trim() === ''){
        return res.status(400).json({ error: 'Entry name and date are required' });
    }
  try {
    const [newJournal] = await knex('journal')
      .insert({
        entry_title, 
        date_made, 
        entry,
        user_id: userId,
      })
      .returning('*');
    
    res.status(201).json(newJournal);
  } catch (err) {
    console.error('Error creating entry:', err);
    res.status(500).json({ error: 'Failed to create entry' });
  }
};

exports.updateJournal = async (req, res) => {
  const { id } = req.params;
  const { entry_title, 
        date_made, 
        entry } = req.body;
  const userId = req.session.userId;

 if (!entry_title || !date_made || entry_title.trim() === ''){
        return res.status(400).json({ error: 'Entry name and date due are required' });
    }

  try {
    const [updatedJournal] = await knex('journal')
      .where({ id, user_id: userId })
      .update({ 
        entry_title, 
        date_made, 
        entry,
      })
      .returning('*');

    if (!updatedJournal) {
      return res.status(404).json({ error: 'Entry not found or access denied' });
    }

    res.json(updatedJournal);
  } catch (err) {
    console.error('Error updating entry:', err);
    res.status(500).json({ error: 'Failed to update entry' });
  }
};


exports.deleteJournal = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;

  try {
    const deleteJournal = await knex('journal')
      .where({ id, user_id: userId })
      .del();

    if (deleteJournal === 0) {
      return res.status(404).json({ error: 'Entry not found or access denied' });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting entry:', err);
    res.status(500).json({ error: 'Failed to delete entry' });
  }
};