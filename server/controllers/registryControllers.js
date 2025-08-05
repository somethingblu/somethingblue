const knex = require('../db/knex')

exports.getRegistry = async (req, res)  => {
    const userId = req.session.userId;

    try{
        const registry = await knex ('registry_list')
        .where({ user_id: userId })
        .orderBy('registry_name'); 
        res.json(registry);
    } catch (err) {
        console.error('Error fetching item:', err);
        res.status(500).json({ error: 'Failed to fetch item' });
     }
};

exports.createRegistry = async (req, res) => {
    const { registry_name, price, description, was_purchased } = req.body;
    const userId = req.session.userId

    if (!registry_name || !was_purchased || registry_name.trim() === ''){
        return res.status(400).json({ error: 'Item name and if purchased are required' });
    }
  try {
    const [newRegistry] = await knex('registry_list')
      .insert({
        registry_name, 
        price, 
        description, 
        was_purchased,
        user_id: userId,
      })
      .returning('*');
    
    res.status(201).json(newRegistry);
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).json({ error: 'Failed to create item' });
  }
};

exports.updateRegistry = async (req, res) => {
  const { id } = req.params;
  const { registry_name, price, description, was_purchased } = req.body;
  const userId = req.session.userId;

 if (!registry_name || !was_purchased || registry_name.trim() === ''){
        return res.status(400).json({ error: 'Item name and if purchased are required' });
    }

  try {
    const [updatedRegistry] = await knex('registry_list')
      .where({ id, user_id: userId })
      .update({ 
        registry_name, 
        price, 
        description, 
        was_purchased
      })
      .returning('*');

    if (!updatedRegistry) {
      return res.status(404).json({ error: 'Item event not found or access denied' });
    }

    res.json(updatedRegistry);
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(500).json({ error: 'Failed to update item' });
  }
};


exports.deleteRegistry = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;

  try {
    const deleteRegistry = await knex('registry_list')
      .where({ id, user_id: userId })
      .del();

    if (deleteRegistry === 0) {
      return res.status(404).json({ error: 'Registry not found or access denied' });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting calendar:', err);
    res.status(500).json({ error: 'Failed to delete calendar' });
  }
};