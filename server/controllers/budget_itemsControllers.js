const knex = require('../db/knex');

exports.getBudgetItem = async (req, res) => {
  const userId = req.session.userId;
  try {
    const item = await knex('budget_items')
     .join('contacts', 'budget_items.contact_id', '=', 'contacts.id')
      .where('contacts.user_id', userId)
      .select('budget_items.*')
      .orderBy('label');
    res.json(item);
  } catch (err) {
    console.error('Error fetching budget items:', err);
    res.status(500).json({ error: 'Failed to fetch budget items' });
  }
};

exports.createBudgetItem = async (req, res) => {
  const { label, price, amount_given, contact_id } = req.body;
  const userId = req.session.userId;

  if (!label || !price || !contact_id || label.trim() === ''  || !Number(price)) {
    return res.status(400).json({ error: 'Budget, contact and price are required' });
  }

  try {
    console.log(req.body)
    const [newItem] = await knex('budget_items')
      .insert({
        label: label.trim(),
        price: Number(price), 
        amount_given: amount_given !== undefined ? Number(amount_given) : null, 
        contact_id: contact_id ? Number(contact_id) : null
      })
      .returning('*');
    
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Error creating budget item:', err);
    res.status(500).json({ error: 'Failed to create budget item' });
  }
};

exports.updateBudgetItem = async (req, res) => {
  const { id } = req.params;
  const { label, price, amount_given, contact_id } = req.body;
  const userId = req.session.userId;

  if (!label || !price || label.trim() === '' || price.trim() === '') {
    return res.status(400).json({ error: 'Budget label and price are required' });
  }

  try {
    const [updated] = await knex('budget_items')
     .join('contacts', 'budget_items.contact_id', '=', 'contacts.id')
      .where('budget_items.id', id)
      .andWhere('contacts.user_id', userId)
      .update({ 
        label: label.trim(),
        price: Number(price), 
        amount_given: amount_given !== undefined ? Number(amount_given) : null, 
      })
      .returning('*');

    if (!updated) {
      return res.status(404).json({ error: 'Budget item not found or access denied' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating budget item:', err);
    res.status(500).json({ error: 'Failed to update budget item' });
  }
};

exports.deleteBudgetItem = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;

  try {
    const deletedCount = await knex('budget_items')
      .join('contacts', 'budget_items.contact_id', '=', 'contacts.id')
      .where('budget_items.id', id)
      .andWhere('contacts.user_id', userId)
      .del();

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Budget item not found or access denied' });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting budget item:', err);
    res.status(500).json({ error: 'Failed to delete budget item' });
  }
};