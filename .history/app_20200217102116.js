// setting up global directory
global.__base = __dirname + '/';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const usersRoute = require('./routes/users');

// testing routes
const localTests = require('./routes/localTests');

require('./src/db/mongoose');
require('./src/passport/passport');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/users', usersRoute);

app.use('/localtests', localTests);

app.listen(process.env.PORT, () => {
    console.log('success connected to server');
})