## BACKEND

Backend is developed with [Node.js](https://nodejs.org/) and [Knex.js](http://knexjs.org/) as SQL Query builder. Some endpoints use [Sendgrid v3 API](https://sendgrid.com/docs/api-reference/).

**To create database connection;**

1. Install [Postgresql](https://www.postgresql.org/)
2. To create database and tables, direct to `server/sql_scripts.sql`;
    * Change the `<<YOUR_DATABASE_NAME_HERE>>` tag inside the first SQL command for database creation as you like.
    * Run SQL scripts via terminal or any database management software in the correct order as in this file. Do not omit creating uuid extension command!
3. Direct to `server/db/connection`\
   * Enter your database name in variable:\
   `const string = "postgresql://postgres:root@localhost/<<YOUR DATABASE NAME HERE>>"`
   * Change user and pass if needed. 
   * SSL configuration is for Heroku free plan if you will need to use.

**To use auth tokens and Sendgrid API;**

1. Direct to `server/.env`
2. Enter a key that you will generate on your own into `secret` variable.
3. Enter the API key you will obtain from Sendgrid into `SENDGRID_API_KEY` variable.

Keep in mind that;
> * Your should NOT keep any secret keys in src directory in production! All keys and database connections are configured to be accessiable via PROCESS.ENV via local or hosting.
> * Also in production remember to remove `/signup` endpoint from 
>```
>app.use(authMiddleware.unless({
>path: [
>        { url: '/login', methods: ['POST'] },
>        { url: '/signup', methods: ['POST'] }] //REMOVE IN PRODUCTION
>}))
>```

**To run the application**

    cd server
    npm install
    npm run start:dev