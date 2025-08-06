const db = require('../db')

exports.getBudgetItem = (userId)  => {
    return db('budget_items')
    .where({user_id: userId})
    .orderBy('label')
};

exports.createBudgetItem = (item) => {
    return db('budget_items')
    .insert(item)
    .returning('*')
};

exports.updateBudgetItem = (id, updates) => {
    return db('budget_items')
    .where({id})
    .update(updates)
    .returning('*')
};

exports.deleteBudgetItem = (id) => {
    return db('budget_items')
    .where({id})
    .del()
}

