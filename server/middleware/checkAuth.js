// Middleware to check if *any* user is logged in
const checkAuthentication = (req, res, next) => {
  const { userId } = req.session;

  console.log(req.session)

  if (!userId) {
    console.log("⛔ No userId in session.");
    return res.status(401).json({
      message: "Unauthorized, please log in to perform this action.",
    });
  }

  // User is logged in
  return next();
};

module.exports = checkAuthentication;
