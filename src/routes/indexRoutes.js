const router = require('express').Router();
const path = require('path')
const phonesController = require(path.join('../controllers/phonesController'))

router.get('/', async (req, res) =>{
    let queue;
    phonesController.getLast().then(
        (phones, er) =>
    {
       // console.log(phones);
        res.render("index", {layout: 'main', phones} );
    });
    //console.log(phones);

})

router.post("/search", async (req, res) =>
{
    let query = req.body.searchbar;
    phonesController.search(query).then(

        (phones, er)=>{
            console.log(phones);
            res.render("search", {layout: 'main', phones});
        }

    )

}
)


module.exports = router;