const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');

app.use((bodyParser.json()));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('node-backend/images')));

mongoose.connect('mongodb+srv://benjaminNoAdmin:1234@cluster0-1e4ks.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to db');
  })
  .catch(() => {
    console.log('Connection Failed');
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});

app.use('/api/posts',postsRoutes);
app.use('/api/users',usersRoutes);



module.exports = app;
