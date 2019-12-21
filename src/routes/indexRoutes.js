const router = require('express').Router();
const path = require('path')
const phonesController = require(path.join('../controllers/phonesController'))
var brandsnames={};



router.get('/', async (req, res) =>{
    phonesController.getLast()
        .then(
        (phones) =>
    {
        if(req.user){
            var user=req.user[0];
        }
        res.render("index", {layout: 'main', phones, user} );
    });
});

router.post("/search", async (req, res) => {
    //initialize brand field

    if (!brandsnames.length) {
        phonesController.getbrands(req).then(
            function f(phones) {
                brandsnames = phones;
            },
            function (err) {
                console.log(err);
            }
        );
    }

    if (req.body.searchbar) {
        phonesController.searchName(req.body.searchbar).then(
            (phones, err) => {
                if (req.user) {
                    var user = req.user[0];
                }
                res.render("search", {layout: 'main', phones, brandsnames, user})
            }
        )
    }
   else {
        phonesController.searchParam(req).then(
            (phones, er) => {
                if (req.user) {
                    var user = req.user[0];
                }
                res.render("search", {layout: 'main', phones, brandsnames, user});
            }
        )
    }
})

router.get("/search", async (req, res)=> {
    if (!brandsnames.length) {
        phonesController.getbrands(req).then(
            function f(phones) {
                brandsnames = phones;
            },
            function (err) {
                console.log(err);
            }
        );
    }

    phonesController.searchParam(req).then(
        (phones, err) => {
            if (req.user) {
                var user = req.user[0];
            }
            if(!phones.length){
                var message="Nothing found";
            }
            res.render("search", {layout: 'main', phones, brandsnames, user, message})
        }
    )
});

router.get("/search/phone/:id", async (req, res)=>{
    let id = req.params.id;
    let review={};
    let stores;
    if(!!id){
        phonesController.getReviews(req).then(
            (res, err)=>{
                review =res;
            }
        );
        phonesController.getStores(req).then(
            (res, err)=>{
                stores=res;
            }
        );
        phonesController.getById(req).then(
            (phone, err)=>
            {
                if(err) {}//todo
                if(req.user){
                    var user=req.user[0];
                }
               let  user_another=user;
                let title=phone[0].brand+phone[0].name;
                res.render("phoneIns", {layout: 'main', phone:phone[0], review, stores, user,user_another});
            }
        )
    }
});



module.exports = router;