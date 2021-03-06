# Email Marketing Manager - PERN Stack - Sendgrid

A full-stack application using Postgresql, Express, React and Node.js stack to build email list focused on location, export the list via filters of email activities and import Sendgrid Activity Reports after using Sendgrid Marketing Singlesends \(Free Plan\) on Web and track the email activity per company. 




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


## FRONTEND

Frontend is developed with React Hooks + Context API and Modular SCSS. Direct to `/register` to initialize a user account.

**To run the application:**

    cd client
    yarn    
    yarn start

**To run the tests over few main features:**

    yarn test  




## Some shots from the app:


``The companies list may include newly added companies which won't have email activity records. Companies may be exported due to selection of different filters. "Global Unsubscribers" and "Unsubscribers in Latest Events" differs. You may click anytime to Update Global Unsubscribers to from Sendgrid API and all companies will be updated. Unsubscribes showing up in Latest Events are the ones that were captured in Free Plan``

![alt text](docs/filter_activity_export_to_csv.gif)

<br/>
<br/>

``When using Sendgrid Marketing Singlesends on web, you can download email activity reports (Free Plan) and import into app. To import and process a report, you follow the steps as the application leads like below. Before importing the application you need to click Refresh send button which will update the list from Sendgrid API which will be updated after each singlesend.``

![alt text](docs/unsubs_import_activity.gif)

<br/>
<br/>

``Shots of CRUD operations for companies list``

![alt text](docs/add_company.gif)
<br/>
<br/>


