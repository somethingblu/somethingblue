
const User = require("../models/User");

/* 
GET /api/users
Returns an array of all users in the database
*/
exports.listUsers = async (req, res) => {
  const users = await User.list();
  res.send(users);
};

/* 
GET /api/users/:id
Returns a single user (if found)
*/
exports.showUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.find(id);
  if (!user) {
    return res.status(404).send({ message: "User not found." });
  }
  res.send(user);
};

/* 
PATCH /api/users/:id
Updates a single user (if found) and only if authorized
*/
exports.updateUser = async (req, res) => {
  console.log(req.body);
  const { name, email, budget, wedding_date } = req.body;
  if (!name) {
    return res.status(400).send({ message: "New username required." });
  }

  //grab the user id from the request params and the user id from the session
  const userToModify = Number(req.params.id);
  const userRequestingChange = Number(req.session.userId);

  //if the user id from the request params does not match the user id from the session
  if (userRequestingChange !== userToModify) {
    console.log("Requesting User ID (session):", req.session.userId);
    console.log("User to Modify (param):", req.params.id);
    return res.status(403).send({ message: "Unauthorized." });
  }

  //if they match then we know they want to modify their own user information
  const updatedUser = await User.update(
    userToModify, //id
   {name, 
   email, 
   budget, 
   wedding_date}
  );
  if (!updatedUser) {
    return res.status(404).send({ message: "User not found." });
  }
  console.log("updatedUser", updatedUser);
  res.send(updatedUser);
};