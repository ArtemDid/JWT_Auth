const express = require('express');
require('dotenv').config();
import UserWithDb from './users';
import Auth from './auth';
const UserWithDb = require('./users');
const Auth = require('./users');

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    return res.status(200).send({ 'message': 'OK!' });
});

app.post('/create', Auth.verifyToken, UserWithDb.create);
app.post('/login', Auth.verifyToken, UserWithDb.login);

app.listen(3000, () => {
    console.log(`App running on port 3000.`)
})