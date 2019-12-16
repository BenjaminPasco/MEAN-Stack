const express = require('express');

const app = express();

app.use('/api/posts',(req, res, next) => {
    const posts = [
      {
        id: '618646564',
        title: 'first server-side post',
        content: 'this is coming for the backend'
      },
      {
        id: '64644102',
        title: 'second server-side post',
        content: 'this is also coming from the server side'
      }
    ];
    res.status(200).json({
      message: 'posts fetched',
      posts: posts
    });
});



module.exports = app;
