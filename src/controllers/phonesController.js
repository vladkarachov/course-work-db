var sql=require('../db.js')

const controller = {};



// controller.getAllKeys = () =>{
//
//         sql.query('SELECT * FROM Phones', (err, phones) => {
//             if (err) {
//                 res.json(err);
//             }
//             res.render('customers', {
//                 data: customers
//             });
//         });
//
// }

function getAll (result) {
    return new Promise((resolve, reject) => {
        sql.query("Select * from Phones",
        function (err, result, fields) {
                if (err) reject(err);
                    resolve(result);
            });

//         sql.query("SELECT * FROM Phones", function (err, result, fields) {
//             if (err) throw err;
//             console.log(result);
//             return result;
// });

})
}

function getLast () {
    return new Promise((resolve, reject) => {
        sql.query("Select * from Phones ORDER BY id DESC LIMIT 5",
            function (err, result, fields) {
                if (err) reject(err);
                resolve(result);
            });
    })
}


function search (query){
query='%'+query+'%'
return new Promise ((resolve, reject) =>{

    sql.query("Select * from Phones where brand LIKE ? " +
        "union " +
        "Select * from Phones where name LIKE ?", [query, query],
        function (err, result, fields) {
                if(err) reject(err);
                resolve(result);
        }

    )

})

}

module.exports = {
    getAll,
    getLast,
    search


};