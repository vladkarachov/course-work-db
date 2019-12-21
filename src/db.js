

var mysql = require('mysql');
//
//
var connection = mysql.createConnection({
    host: 'zanner.org.ua',
    user: 'ka7504',
    password: '123456',
    port: 33321,
    database: 'ka7504'
});
//
connection.connect(function(err) {
    if (err) throw err;
});
module.exports = connection;

//пул соеденений ето очень модно - но к сожалению половина запросов исчезает по пути(
// const pool = mysql.createPool({
//     host: 'zanner.org.ua',
//     user: 'ka7504',
//     password: '123456',
//     port: 33321,
//     database: 'ka7504'
// });
//
// exports.connection = {
//     query: function () {
//         var queryArgs = Array.prototype.slice.call(arguments),
//             events = [],
//             eventNameIndex = {};
//
//         pool.getConnection(function (err, conn) {
//             if (err) {
//                 if (eventNameIndex.error) {
//                     eventNameIndex.error();
//                 }
//             }
//             if (conn) {
//                 var q = conn.query.apply(conn, queryArgs);
//                 q.on('end', function () {
//                     conn.release();
//                 });
//
//                 events.forEach(function (args) {
//                     q.on.apply(q, args);
//                 });
//             }
//         });
//
//         return {
//             on: function (eventName, callback) {
//                 events.push(Array.prototype.slice.call(arguments));
//                 eventNameIndex[eventName] = callback;
//                 return this;
//             }
//         };
//     }
// };

