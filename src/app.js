const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
    //hbs = require('express-hbs')
      router = express.Router(),
      myConnection = require('express-myconnection');

const app = express();
module.exports = router;


// importing routes
const customerRoutes = require('./routes/customer');
const indexRoutes=require('./routes/indexRoutes')
// settings

app.set('port', process.env.PORT || 3000);
// app.set('view engine', 'hbs');
// app.set('views', __dirname + '/views');
// app.engine('hbs', hbs.express4({
//     extname: 'hbs',
//     defaultView: 'main',
//     layoutsDir: __dirname + '/views/layouts',
//   partialsDir: __dirname + '/views/partials'
// }));
let hbs  = require('express-handlebars');
app.use('views', express.static(path.join(__dirname, 'views')));
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: '',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));
;

// middlewares
app.use(morgan('dev'));
// app.use(myConnection(mysql, {
//   host: 'zanner.org.ua',
//   user: 'ka7504',
//   password: '123456',
//   port: 33321,
//   database: 'ka7504'
// }, 'single'));


app.use(express.urlencoded({extended: false}));




// routes
app.use('/', indexRoutes);

// static files
app.use('/', express.static(path.join(__dirname, '../public')));
//app.use(express.static('public'));


// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
