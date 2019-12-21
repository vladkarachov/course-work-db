const LocalStrategy = require('passport-local').Strategy
const md5=require('js-md5')
const passport = require('passport')
const users = require('./controllers/userController')

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use('local', new LocalStrategy(
    (username, password, done) => {
        users.getuser(username)
            .then(user => {
                if (!user[0]) {
                   // console.log('User not found');
                    done(null, false);
                    throw("404");
                }
                    if(md5(password)==user[0].psswd)
                    {
                        done(null, user);
                        } else {
                          //  console.log("Not Valid");
                            done(null, false);
                        }
            }, done)

            .catch(err => {
                console.log(err);
                done(err);
            });
    }));


module.exports = passport;