require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');
const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env['TOKEN_SECRET'],
    baseURL: 'http://localhost:3000',
    clientID: '4QIcVR5yWJhF3ELcrJZAROzIpeETKzzv',
    issuerBaseURL: 'https://panda288.us.auth0.com'
};


app.use(express.json());

app.use(auth(config));

app.use('/snippet', routes.snippet);
app.use('/user', routes.user);

app.get('/', (req, res) => {
    res.send({ message: 'successful' });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

