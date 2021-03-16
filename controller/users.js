const db = require('../db/db.config');
const Helper = require('./helper');

const User = {
    async create(req, res) {
        console.log(req.body);

        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ 'message': 'Some values are missing' });
        }
        if (!Helper.isValidEmail(req.body.email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }
        const hashPassword = Helper.hashPassword(req.body.password);

        console.log(hashPassword);

        const createQuery = `INSERT INTO users(login, password) VALUES($1, $2) returning *`;
        const values = [
            req.body.email,
            hashPassword
        ];

        try {
            const { rows } = await db.query(createQuery, values);
            console.log(rows[0].id);
            const token = Helper.generateToken(rows[0].id);
            console.log(token);
            return res.status(201).send({ token });
        } catch (error) {
            console.log("eee",error);
            if (error.routine === '_bt_check_unique') {
                return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
            }
            return res.status(400).send(error);
        }
    },
    
    async login(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ 'message': 'Some values are missing' });
        }
        if (!Helper.isValidEmail(req.body.email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }
        const text = 'SELECT * FROM users WHERE login = $1';
        try {
            const { rows } = await db.query(text, [req.body.email]);
            if (!rows[0]) {
                return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
            }
            if (!Helper.comparePassword(rows[0].password, req.body.password)) {
                return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
            }
            const token = Helper.generateToken(rows[0].id);
            return res.status(200).send({ token });
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    
}

module.exports = User;