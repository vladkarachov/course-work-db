module.exports = {
    putuser,
    getuser
}

function putuser(req){
    let cc;
    switch (req.body.country_code) {
        case "Ukraine": cc=1; break;
        case "North Korea": cc=2; break;
    }
    return new Promise((resolve, reject) => {
        req.getConnection((err, sql)=>{
            sql.query("Insert into users (full_name, psswd, country_code) values (?, ?, ?)", [req.body.name, req.body.password, cc],
                function (err, result, fields) {
                    if (err) reject(err);
                    resolve(result);
                });
        });
    });
}

function getuser(req){
    return new Promise((resolve, reject) => {
        req.getConnection((err, sql)=>{
            sql.query("Select * from users where full_name=?", [req.body.name],
                function (err, result, fields) {
                    if (err) reject(err);
                    resolve(result);
                });
        });
    });
}
