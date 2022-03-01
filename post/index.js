const express = require('express');

const config = require('../config');
const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ 
    extended: true 
}));

//ROUTER
app.use('/api/post', post);

app.use(errors);

app.listen(config.post.port, () => {
    console.log('Post escuchando en puerto: ', config.post.port);
});