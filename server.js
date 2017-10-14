const express = require('express');
const path = require('path');
const winston = require('winston');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = require('./config');
const index = require('./routes/index');
const dashboard = require('./routes/admin/dashboard');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Static file serving
app.use(express.static(path.join(__dirname, 'assets')));

// Configure template engine to use handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Add routes
app.use('/', index);
app.use('/admin', dashboard);

// Launch the server
app.listen(config.port, () => {
  winston.info(`App running on ${config.port}`);
});
