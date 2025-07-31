const knex = require('../db/knex');
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

class User {
    #passwordHash = null;

    //we are creating a new user with a hidden password 
    constructor({ id, name, email, password, budget, wedding_date }) {
        this.id = id;
        this.name = name, 
        this.email = email, 
        this.#passwordHash = password, 
        this.budget = budget,
        this.wedding_date = wedding_date;
    }

// Controllers can use this instance method to validate passwords prior to sending responses
  /* That isValidPassword method is defined inside the User class as an instance method, 
  so it’s not a standalone variable. It’s being defined on each instance of the class.

  This means that when you create a new User object, it will have access to this method.
   */
  isValidPassword = async (password) => {
    return await bcrypt.compare(password, this.#passwordHash);
  };

  // Hashes the given password and then creates a new user
  // in the users table. Returns the newly created user, using
  // the constructor to hide the passwordHash.
  static async create({
    name, 
    email, 
    password, 
    budget, 
    wedding_date
  }) {
    // hash the plain-text password using bcrypt before storing it in the database
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    //Pass values using SQL query parameters to prevent SQL injection
    //Ensure that the values match the correct column types in the database
    const query = `
    INSERT INTO users (
    name, 
    email, 
    password, 
    budget, 
    wedding_date)
    VALUES (?, ?, ?, ?, ?)
    RETURNING *
  `;

    //we pass passwordHash to the query instead of password
    //because we want to store the hashed password in the database

    /*since passwordHash is also a private property in the constructor
     it will not be exposed when we create a new user and log the result
    */
    const result = await knex.raw(query, [
    name, 
    email, 
    passwordHash, 
    budget, 
    wedding_date
    ]);

    const rawUserData = result.rows[0];
    return new User(rawUserData);
  }

  // Fetches ALL users from the users table, uses the constructor
  // to format each user (and hide their password hash), and returns.
  static async list() {
    const query = `SELECT * FROM users`;
    const result = await knex.raw(query);
    return result.rows.map((rawUserData) => new User(rawUserData));
  }

  // Fetches A single user from the users table that matches
  // the given user id. If it finds a user, uses the constructor
  // to format the user and returns or returns null if not.
  static async find(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  // Same as above but uses the username to find the user
  static async findByName(name) {
    const query = `SELECT * FROM users WHERE name = ?`;
    const result = await knex.raw(query, [name]);
    const rawUserData = result.rows[0];
    console.log('user found', rawUserData);
    return rawUserData ? new User(rawUserData) : null;
  }


  // Updates the user that matches the given id with a new username.
  // Returns the modified user, using the constructor to hide the passwordHash.
  static async update(name, 
    email, 
    password, 
    budget, 
    wedding_date) {
    const query = `
      UPDATE users
      SET name = ?,
        email = ?,
        budget = ?,
        wedding_date = ?
      WHERE id = ?
      RETURNING *
    `;
    const result = await knex.raw(query, [name, 
    email, 
    password || passwordHash, 
    budget, 
    wedding_date,
    id]);
    const rawUpdatedUser = await result.rows[0];
    return rawUpdatedUser ? new User(rawUpdatedUser) : null;
  }

  static async deleteAll() {
    return knex("users").del();
  }
}

module.exports = User;