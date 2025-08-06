const db = require('../db'); // your configured knex instance

exports.getRegistryItems = (userId) => {
  return db('registry_list')
    .where({ user_id: userId })
    .orderBy('registry_name');
};

exports.createRegistryItem = (item) => {
  return db('registry_list')
    .insert(item)
    .returning('*');
};

exports.updateRegistryItem = (id, updates) => {
  return db('registry_list')
    .where({ id })
    .update(updates)
    .returning('*');
};

exports.deleteRegistryItem = (id) => {
  return db('registry_list')
    .where({ id })
    .del();
};
