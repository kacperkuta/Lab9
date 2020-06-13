var express = require('express');
var session = require('express-session');
var SessionStore = require('express-mysql-session');

var app = express();
let options = {
    host: 'localhost',
    port: 3001,
    database: 'session_test',
    createDatabaseTable: true
};
var sessionStore = new SessionStore(options);

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));

app.listen(3000);