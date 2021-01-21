const knex = require('knex');

const string = "postgresql://postgres:root@localhost/<<your_database_name>>"
const ssl = {
    rejectUnauthorized:false
}

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL || string,
        ssl: process.env.DATABASE_URL ? ssl : false
    }
});

module.exports = { db };