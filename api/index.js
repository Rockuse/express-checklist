const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(express.static('public'));
require('./routes')(app, express);

module.exports = app;
