const express = require('express')
const Router = express.Router();
const { db } = require('../../db/connection')
const { validateUser, generateAuthToken } = require('../../utils/common');
const bcrypt = require('bcryptjs');

Router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await validateUser(email, password);
        if (!user) {
            res.status(400).send({
                signin_error: 'Email/password does not match.'
            });
        }
        const token = await generateAuthToken(user);

        const result = await db('tokens')
            .returning('*')
            .insert({
                'access_token': token,
                'userid': user.id
            })
        if (!result[0]) {
            return res.status(400).send({
                signin_error: 'Error while signing in...'
            });
        }

        user.token = result[0].access_token;
        res.send(user);

    } catch (error) {
        res.status(400).send({
            signin_error: 'Email/password does not match.'
        });
    }
});

Router.post('/logout', async (req, res) => {
    try {
        const { id, access_token } = req.user;
        await db('tokens')
            .where('userid', id)
            .andWhere('access_token', access_token)
            .del();
        res.send();
    } catch (error) {
        res.status(400).send({
            logout_error: 'Error while logging out..Try again later.'
        });
    }
});

Router.post('/signup', async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            password
        } = req.body;

        const existingEmail = await db('user')
            .count('*')
            .where('email', email)

        const count = existingEmail[0].count;

        if (count > 0) {
            return res.status(400).send({
                signup_error: 'User with this email already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 8)
        await db('user').insert({
            first_name,
            last_name,
            email,
            'password': hashedPassword
        })
        res.send('Register is successful!');
    } catch (error) {
        res.status(400).send({
            signup_error: 'Signup NOT Successed.'
        });
    }
});

module.exports = Router;
