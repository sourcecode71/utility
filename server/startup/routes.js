const express = require('express');
var cors = require('cors');
const auth = require('../routes/auth');
const users = require('../routes/users');
const country = require('../routes/country');
const postType = require('../routes/UserPosts/PostType');
const utilityType = require('../routes/utility/ultType');
const posts = require('../routes/UserPosts/Posts');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/country', country);
  app.use('/api/posts-type',postType);
  app.use('/api/posts',posts);
  app.use('/api/utility-type',utilityType);
  app.use(error);
}