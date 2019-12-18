

const router = require('express').Router();
const path = require('path')
const phonesController = require(path.join('../controllers/phonesController'))
var brandsnames={};



router.get('/', async (req, res) =>{
    let queue;
    phonesController.getLast(req).then(
        (phones, er) =>
    {
        res.render("index", {layout: 'main', phones} );
    });
})

router.post("/search", async (req, res) => {
        //initialize brand field

        if(!brandsnames.length){
            phonesController.getbrands(req).then(
                function f(phones) {
                    brandsnames= phones;
                },
                function (err) {
                    console.log(err);
                }

            );
        }

       if(!!req.body.usingform || req.body.maxprice){
            phonesController.searchParam(req).then(
                (phones, er) => {
                    console.log(phones);
                    res.render("search", {layout: 'main', phones, brandsnames});
                }
            )

        }
         if (!!req.body.searchbar) {
            phonesController.searchName(req, req.body.searchbar).then(
                (phones, er) => {
                    console.log(phones);
                    res.render("search", {layout: 'main', phones});
                }
            )

        }

    })

router.get("/search", async (req, res)=>{
    if(!brandsnames.length){
        phonesController.getbrands(req).then(
            function f(phones) {
                brandsnames= phones;
            },
            function (err) {
                console.log(err);
            }

        );
    }
        phonesController.getAllkeys(req).then(
            (phones, err)=>
            {
                res.render("search", {layout: 'main', phones, brandsnames})
            }
        )

})

router.get("/search/phone/:id", async (req, res)=>{
    let id = req.params.id;
    let review={};
    let stores;
    if(!!id){
        phonesController.getReviews(req).then(
            (res, err)=>{
                review =res;
            }
        )
        phonesController.getStores(req).then(
            (res, err)=>{
                stores=res;
            }
        )
        phonesController.getById(req).then(
            (phone, err)=>
            {
                if(err) {}//todo
                console.log(phone);
                res.render("phoneIns", {layout: 'main', phone, review, stores});
            }
        )
    }
})

module.exports = router;