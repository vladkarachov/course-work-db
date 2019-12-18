const md5 = require('js-md5');
const passport = require('passport')
const router = require('express').Router();
const path = require('path')
const userController = require('../controllers/userController')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.hbs')
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))


router.post('/register', checkNotAuthenticated, async (req, res) => {

        userController.getuser(req).then(
            (users, err) => {
                if (users.length!=0) {
                    res.render('login', {layout: "main", message: "user already exist"});
                }
                else {
                    userController.putuser(req).then(
                        (us, err) => {
                            res.redirect('/')
                        }
                    )
                }
            })

    })

router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

module.exports = router;