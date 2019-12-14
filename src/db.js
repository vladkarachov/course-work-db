'user strict';

var mysql = require('mysql');


var connection = mysql.createConnection({
    host: 'zanner.org.ua',
    user: 'ka7504',
    password: '123456',
    port: 33321,
    database: 'ka7504'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;