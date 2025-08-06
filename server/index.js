require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const handleCookie = require('./middleware/handleCookie');
const logRoutes = require('./middleware/logRoutes');
const checkAuth = require('./middleware/checkAuth');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(handleCookie);
app.use(express.json());
app.use(logRoutes);

const userRoutes = require('./routes/userRoutes')
const todoRoutes = require('./routes/todoRoutes');
const userControllers = require('./controllers/registerUser');
const contactRoutes = require('./routes/contactRoutes')
const budgetRoutes = require('./routes/budgetRoutes')
const registryRoutes = require('./routes/registryRoutes')
const playlistRoutes = require('./routes/playlistRoutes')
const journalRoutes = require('./routes/journalRoutes')
const calenderRoutes = require('./routes/calenderRoutes')

// Auth routes
app.post('/api/auth/signup', userControllers.registerUser);
app.post('/api/auth/login', userControllers.loginUser);
app.get('/api/auth/me', userControllers.showMe);
app.post('/api/auth/logout', userControllers.logoutUser);


app.use('/todos', checkAuth, todoRoutes);
app.use('/api/users', userRoutes)
app.use('/api/contacts', contactRoutes)
app.use('/api/budget', budgetRoutes)
app.use('/api/registry_list', registryRoutes)
app.use('/api/playlist', playlistRoutes)
app.use('/api/journal', journalRoutes)
app.use('/api/calendar', calenderRoutes)

app.get('/', (req, res) => {
  res.send('Hello World! Server is working!');
});

app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});