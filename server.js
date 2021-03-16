const express = require('express');
require('dotenv').config();
const UserWithDb = require('./controller/users');
const Auth = require('./middleware/auth');

const app = express()

app.use(express.json())

app.get('/', Auth.verifyToken, (req, res) => {
    return res.status(200).send({ 'message': 'OK!' });
});

app.post('/create', UserWithDb.create);
app.post('/login/auth', UserWithDb.login);
// app.post('/login', UserWithDb.login);

app.listen(3001, () => {
    console.log(`App running on port 3001.`)
})