var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var db = require('./routes/db');
var api = require('./routes/api');

var app = express();

var PORT = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, '../client/src/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/', index);
app.use('/db/', db);
app.use('/api/', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('404 Not Found');
    err.status = 404;
    next(err);
});

app.listen(PORT, function() {
    console.log('Servidor iniciado na porta ' + PORT);
});

module.exports = app;
