//var sql=require('../db.js')
//const sql = require('../app')

//only for filters
function getbrands(req){
    return new Promise((resolve, reject) => {
         req.getConnection((err, sql)=>{
            sql.query("Select distinct brand from Phones",
                function (err, result, fields) {
                    if (err) reject(err);
                    resolve(result);
                });
         });
    });
}

function getAllkeys(req) {
        return new Promise((resolve, reject) => {
            req.getConnection((err, sql)=>{
                sql.query("Select * from Phones",
                    function (err, result, fields) {
                        if (err) reject(err);
                        resolve(result);
                    });
            });
        });
}


function getLast (req) {
    return new Promise((resolve, reject) => {
        req.getConnection((err, sql) => {

            sql.query("Select * from Phones ORDER BY id DESC LIMIT 5",
                function (err, result, fields) {
                    if (err) reject(err);
                    resolve(result);
                });
        });
    });
}


function searchName (req, query) {
    query = '%' + query + '%'
    return new Promise((resolve, reject) => {
        req.getConnection((err, sql) => {
            sql.query("Select * from Phones where brand LIKE ? " +
                "union " +
                "Select * from Phones where name LIKE ?", [query, query],
                function (err, result, fields) {
                    if (err) reject(err);
                    resolve(result);
                }
            )

        })

    })
}

function searchPrice (req, query) {
    query=+query;
    return new Promise((resolve, reject) => {
        req.getConnection((err, sql) => {
            sql.query("select p.id, p.name, p.brand, p.ram, p.rom, x.price " +
                "from Phones p left join ( " +
                "select * from Stores s " +
                "where price=(select min(price) from Stores st where st.phoneid=s.phoneid)" +
                " ) x on p.id=x.phoneid " +
                "WHERE(COALESCE(price, 0)<?)", [query],
                function (err, result, fields) {
                    if (err) reject(err);
                    resolve(result);
                }
            )

        })
    })
}
function searchParam(req) {
    let query = "";
    if (!!req.body.minprice) {
        query += " COALESCE(price, 0)>=" + req.body.minprice;
        query += " AND "
    }
    if (!!req.body.maxprice) {
        query += " COALESCE(price, 0)<=" + req.body.maxprice;
        query += " AND "
    }
    if (!!req.body.brand) {
        if(typeof (req.body.brand)!="string"){
        query += " brand in (";
        for (let br of req.body.brand) {
            query += "'"
            query += br;
            query += "',";
        }
        query += "'') AND "
    }
        else{
            query += " brand ='"
            query += req.body.brand;
            query += "' AND "
        }
    }

    if (!!req.body.romslider) {
        query += " COALESCE(rom, 16)>=" + req.body.romslider;
        query += " AND ";
    }
    if (!!req.body.ramslider) {
        query += "COALESCE(ram, 1)>=" + req.body.ramslider;
        query += " AND ";
    }
    query += "1";
    return new Promise((resolve, reject) => {
        req.getConnection((err, sql) => {
            sql.query(
                "select p.id, p.name, p.brand, p.ram, p.rom, x.price " +
                "from Phones p left join ( " +
                "select * from Stores s " +
                "where price=(select min(price) from Stores st where st.phoneid=s.phoneid)" +
                " ) x on p.id=x.phoneid " +
                "WHERE " + query, function (err, result, fields) {
                    if (err) reject(err);
                    resolve(result);
                })


        })
    })
}

function getById(req) {
    return new Promise((resolve, reject) => {
        req.getConnection((err, sql) => {
            //todo join
            sql.query("select * from Phones where id=?", [req.params.id], (err, result, fields) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    })
}


//phones page
function getReviews(req){
    return new Promise((resolve, reject) => {
        req.getConnection((err, sql) => {
            //todo join
            sql.query("select * from Review where phoneid=?", [req.params.id], (err, result, fields) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    })
}
function getStores(req){
    return new Promise((resolve, reject) => {
        req.getConnection((err, sql) => {
            //todo join
            sql.query("select link, price, name, phoneid " +
                "from Stores where phoneid=?", [req.params.id], (err, result, fields) => {
                if (err) reject(err);
                resolve(result);
                console.log(result);
            })
        })
    })
}
module.exports = {
    searchPrice,
    getLast,
    searchName,
    searchParam,
    getbrands,
    getById,
    getReviews,
    getStores,
    getAllkeys

};
