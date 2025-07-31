const User = require('../models/User')
require('dotenv').config();

exports.registerUser = async (req, res) => {
    try {
        // request needs a body
        if (!req.body){
            return res.status(400).json({message: 'Please enter your credentials'})
        }

        //body should contain everything we ask for 
        const {name, email, password, budget, wedding_date} = req.body;

        console.log('Registration request body:', req.body);

        // FIXED: Check if values exist before calling trim()
        if (!name || !name.trim() || !password){
            return res
            .status(400)
            .json({message: 'Name and password are required'})
        }

        // User.create() will create a hash of the password and store it 
        const user = await User.create({
            name: name.trim(), 
            email: email ? email.trim() : null, 
            password, 
            budget: budget ? budget.toString() : null, 
            wedding_date: wedding_date || null
        });
        console.log('User created:', user);
        // Add the user id to the cookie and send the user data back
        req.session.userId = user.id;
        console.log('User created successfully:', user);
        res.json(user);
        
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({message: 'Error creating user: ' + error.message});
    }
}

exports.loginUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Please enter all above' });
    }
    const { name, password } = req.body;
    console.log('Login request body:', req.body);
    if (!name || !password) {
      return res.status(400).json({
        message: 'Missing or incorrect values! Please try again ^0^',
      });
    }
    const user = await User.findByName(name.trim());
    console.log('User found:', user);
    if (!user) {
      return res.status(400).json({
        message: 'User not found! Please try again ^0^',
      });
    }
    const isPassword = await user.isValidPassword(password);
    if (!isPassword) {
      return res.status(401).json({
        message: 'Invalid password! Please try again ^0^',
      });
    }

    req.session.userId = user.id;
    console.log('User logged in successfully:', user);

    // Set session and send user info
    // Only send safe fields to the client
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      budget: user.budget,
      wedding_date: user.wedding_date
    });

    console.log('after', req.session.userId, req.session);

  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({
      message: 'Error logging in user: ' + error.message,
    });
  }
};

exports.showMe = async (req, res) => {
    try {
        // Not authenticated.
        if (!req.session.userId) {
            return res.status(401).json({ message: "User must be authenticated." });
        }

        // cookie with an id 
        const user = await User.find(req.session.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.json(user);
    } catch (error) {
        console.error('Error in showMe:', error);
        res.status(500).json({message: 'Error finding user: ' + error.message});
    }
};

exports.logoutUser = (req, res) => {
    console.log("Session object at logout hit:", req.session);
    if (!req.session.userId) {
        return res.status(401).json({ message: "User must be authenticated." });
    }
    // Remove the user id from the cookie
    console.log("Before clearing session", req.session);
    req.session = null; // "erase" the cookie
    console.log("After clearing session", req.session);
    res.status(200).json({ message: "User logged out." });
};