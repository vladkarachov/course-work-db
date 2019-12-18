const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
    //hbs = require('express-hbs')
      router = express.Router(),
      myConnection = require('express-myconnection'),
      userController = require('../controllers/userController');

//passport
//require(dotenv).config()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const app = express();
module.exports = {router, mysql};
const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => users.find(user => user.name === email),
    id => users.find(user => user.id === id)
)

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: "aa123",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))



// settings

//не работает(
// const sql = mysql.createConnection({
//     host: 'zanner.org.ua',
//     user: 'ka7504',
//     password: '123456',
//     port: 33321,
//     database: 'ka7504'
// })
// module.exports = sql;

app.set('port', process.env.PORT || 3000);
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


// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'zanner.org.ua',
    user: 'ka7504',
    password: '123456',
    port: 33321,
    database: 'ka7504'
}, 'single'));




// importing routes

const indexRoutes=require('./routes/indexRoutes');
const loginRoutes=require('./routes/loginRoutes');
// routes
app.use('/', indexRoutes);
app.use('/', loginRoutes);

// static files
app.use('/', express.static(path.join(__dirname, '../public')));



// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
