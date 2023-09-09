const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(bodyParser.json());

//const db = require('mongodb://127.0.0.1:27017/assignment'); // Import your MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/assignment")
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(error => {
        console.error("Error connecting to DB", error)
    })
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');

app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});