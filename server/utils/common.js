const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../db/connection')

const validateUser = async (email, password) => {
    const result = await db('user')
        .returning('*')
        .select(
            'id',
            'first_name',
            'last_name',
            'email',
            'password'
        )
        .where('email', email)
        
    const user = result[0]; 
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            delete user.password;
            return user;
        } else {
            throw new Error();
        }
    } else {
        throw new Error();
    }
};


const generateAuthToken = async (user) => {
    const { id, email, first_name, last_name } = user;
    const secret = process.env.secret;
    const token = await jwt.sign({ id, email, first_name, last_name }, secret);
    return token;
};

module.exports = {
    validateUser,
    generateAuthToken
};