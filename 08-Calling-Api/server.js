var express = require('express');
var app = express();
var jwt = require('express-jwt');
require('dotenv').config();

if (!process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_SECRET){
  throw 'Make sure you have AUTH0_CLIENT_ID and AUTH0_SECRET in your .env file'
}

var authenticate = jwt({
  secret: process.env.AUTH0_SECRET,
  audience: process.env.AUTH0_CLIENT_ID
});

app.get('/api/public', function(req, res) {
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/private', authenticate, function(req, res) {
  res.json({ message: "Hello from a private endpoint! You DO need to be authenticated to see this." });
});

app.listen(3001);
console.log('Listening on http://localhost:3001');
