const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const Post = require('./models/post');

app.use((bodyParser.json()));
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodb+srv://benjaminNoAdmin:1234@cluster0-1e4ks.mongodb.net/node-angular?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to db');
})
.catch(() => {
  console.log('Connection Failed');
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts',(req, res, next) => {
  const  post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post was added',
      postId: result._id
    });
  });
  
});

app.get('/api/posts',(req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'posts fetched',
        posts: documents
      });
    })
    .catch();
});

app.delete('/api/posts/:id',(req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Post deleted'});
  })
});



module.exports = app;
