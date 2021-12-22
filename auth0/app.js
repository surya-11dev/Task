const express = require('express');
const app = express();
require("dotenv").config();

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: 'http://localhost:3000',
  clientID: 'rLzvnhlK28pZFJi2pbOf87jOF0uFjhpJ',
  issuerBaseURL: 'https://dev-b4ilrzhp.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`listening to localhost ${port}`);
})