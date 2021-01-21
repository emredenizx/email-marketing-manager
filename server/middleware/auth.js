const jwt = require('jsonwebtoken');
const { db } = require('../db/connection');
const unless = require('express-unless')


const authMiddleware = async function (req, res, next) {

    try {
        const token = req.header('Authorization').split(' ')[1];        
        const decoded = jwt.verify(token, process.env.secret);  
        
        const result = await db('user')
            .join('tokens as t', 't.userid', 'user.id')
            .select('user.id',
                'user.first_name',
                'user.last_name',
                'user.email',
                't.access_token'
            )
            .where('t.access_token', token)
            .andWhere('t.userid', decoded.id)

        
        const user = result[0];        

        if (user) {
            req.user = user;
            req.token = token;
            next();
        } else {
            throw new Error('Error while authentication');
        }
    } catch (error) {
        res.status(400).send({
            auth_error: 'Authentication failed.'
        });
    }
};

authMiddleware.unless = unless;

module.exports = {
    authMiddleware
};