require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const authenticateUser = require('./middlewares/auth');
// routers
const authRouter = require('./routes/auth');
const tasksRouter = require('./routes/tasks');
// error handler

app.use(express.json());
app.use(cors());

// routes
app.use('/api/auth', authRouter);
app.use('/api/tasks', authenticateUser, tasksRouter);

const port = process.env.PORT || 8282;


app.get('/hi', (req, res) => {
  res.send('hello')
})

app.listen(port, () =>
  console.log(`Server is listening on port ${port}...`)
);

