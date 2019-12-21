const md5 = require('js-md5');
const passport = require('passport')
const router = require('express').Router();
const path = require('path')
const userController = require('../controllers/userController')


router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.hbs')
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))


router.post('/register', checkNotAuthenticated, async (req, res) => {
    if (req.body.password != req.body.passwordRe) {
        res.render('login', {layout: "main", message: "Passwords do not match"});
    } else {
        userController.getuser(req.body.username).then(
            (users, err) => {
                if (users.length != 0) {
                    res.render('login', {layout: "main", message: "user already exist"});
                } else {
                    userController.putuser(req).then(
                        (us, err) => {
                            res.redirect('/')
                        }
                    )
                }
            })

    }
})

router.post('/logout', async (req, res) => {
    req.logOut();
    res.redirect('/login')
})

router.get('/user', checkAuthenticated, async (req, res)=>{
    userController.getlikes(req.user[0]).then(
        (savedPhones, err) => {
            if(req.user){
                var user=req.user[0];
            }
            res.render('user', {layout: "main", savedPhones, user});
        });
});

router.post("/deleteFromLikes", checkAuthenticated, async (req, res)=> {
    userController.dellike(req).then(
        (savedPhones, err) => {
            res.redirect('/user');
        });

})

router.post("/addLike", checkAuthenticated, async (req, res)=> {
    userController.addlike(req).then(
        (savedPhones, err) => {
            res.redirect('/user');
        });
})


router.post("/addReview", checkAuthenticated, async (req, res)=> {
    userController.addReview(req).then(
        (savedPhones, err) => {
            res.redirect('/search/phone/'+req.body.id);
        });
})

function checkAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.user) {
        return res.redirect('/')
    }
    next()
}

router.post("/addPhone", checkAuthenticated, async (req, res)=> {
    if(!req.user[0].role){
        return res.redirect('/');
    }
    userController.addPhone(req).then(
        (savedPhones, err) => {
            res.redirect('/search');
        });
})

module.exports = router;