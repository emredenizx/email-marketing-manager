const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')

const companyRoute = require('./Routes/Company')
const locationRoute = require('./Routes/Location')
const emailSendsRoute = require('./Routes/EmailSends')
const emailActivityRoute = require('./Routes/EmailActivity')
const authRoute = require('./Routes/Auth')
const csvRoute = require('./Routes/Csv');
const unsubscribesRoute = require('./Routes/Unsubscribes')

const { authMiddleware } = require('./middleware/auth');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use(authMiddleware.unless({
    path: [
        { url: '/login', methods: ['POST'] },
        { url: '/signup', methods: ['POST'] }] //REMOVE IN PRODUCTION
}))

app.use(authRoute)
app.use(companyRoute)
app.use(locationRoute)
app.use(emailSendsRoute)
app.use(emailActivityRoute)
app.use(csvRoute)
app.use(unsubscribesRoute)

app.get('/', (req, res) => { res.send('gnothi seauton') })

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});
