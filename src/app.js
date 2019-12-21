const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),

      router = express.Router()


//passport
const passport = require('./passport-config')
const flash = require('express-flash')
const session = require('express-session')

const app = express();
module.exports = {router, mysql};

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: "aa123",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())



// settings


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
    partialsDir: __dirname + '/views/partials',
    helpers: require( __dirname + '/handlebarl-helper.js')
}));


// middlewares
app.use(morgan('dev'));



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
