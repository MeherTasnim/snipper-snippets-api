require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');


app.use(express.json());

app.use('/snippet', routes.snippet);
app.use('/user', routes.user);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

