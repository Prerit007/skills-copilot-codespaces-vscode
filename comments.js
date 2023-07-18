// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const app = express();

// Parse body of request
app.use(bodyParser.json());

// Store comments
const commentsByPostId = {};

// Get comments for a post
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create a new comment for a post
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
    console.log('Listening on 4001');
});