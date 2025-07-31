const cookieSession = require('cookie-session');

const handleCookie = cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET],
  // maxAge: 24 * 60 * 60 * 1000, // optional: cookie expires in 24 hours
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
});

module.exports = handleCookie;