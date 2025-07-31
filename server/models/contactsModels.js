const db = require('../db')

exports.getContacts = (userId) =>{
    return db('contacts')
    .where({user_id: userId})
    .orderBy('created_at', 'desc')
}

exports.createContacts = (contact) => {
    return db('contacts')
    .insert(contact)
    .returning('*')
}

exports.updateContact = (id, updates) =>{
    return db('contacts')
    .where({id})
    .update(updates)
    .returning('*')
}

exports.deleteContact = (id) => {
    return db('contacts')
    .where({id})
    .del()
}