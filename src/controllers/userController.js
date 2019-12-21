const conn = require('../db');

module.exports = {
    putuser,
    getuser,
    getlikes,
    dellike,
    addlike,
    addReview,
    addPhone
}

function putuser(req){
    let cc;
    switch (req.body.country_code) {
        case "Ukraine": cc=1; break;
        case "North Korea": cc=2; break;
    }
    return new Promise((resolve, reject) => {
        conn.query("Insert into users (full_name, psswd, country_code) values (?, ?, ?)", [req.body.username, req.body.password, cc],
                function (err, result, fields) {
                    if (err) reject(err);
                    resolve(result);
                });
        });

}

function getuser(username){
    return new Promise((resolve, reject) => {
        conn.query("Select full_name, id, created_at, psswd," +
            " case" +
            " when id IN (SELECT admin_id from admins) THEN 1 " +
            "else 0 " +
            "end as 'role' " +
            "from users where full_name=?", [username],
                function (err, result, fields) {
                    if (err) reject(err);
                    resolve(result);
                });
        });
}

function getlikes(user) {
    return new Promise((resolve, reject) => {
        conn.query("Select * from Phones p join (Select userid, phoneid from savedPhones where userid=?) x where x.phoneid=p.id", [user.id],
            function (err, result, fields) {
                if (err) reject(err);
                resolve(result);
            });
    });
}

function dellike(req) {
    return new Promise((resolve, reject) => {
        conn.query("delete from savedPhones where userid=? AND phoneid=? limit 1", [+req.user[0].id, +req.body.del_id],
            function (err, result, fields) {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function addlike(req) {
    return new Promise((resolve, reject) => {
        conn.query("insert into savedPhones ( userid , phoneid) values (?,?)", [req.user[0].id, req.body.phoneid],
            function (err, result, fields) {
                if (err) reject(err);
                resolve(result);
            });
    });
}

function addReview(req) {
    return new Promise((resolve, reject) => {
        conn.query("insert into Review ( Text, userid , phoneid) values (?,?,?)", [req.body.review_text, req.user[0].id, req.body.id],
            function (err, result, fields) {
                if (err) reject(err);
                resolve(result);
            });
    });
}

function addPhone(req) {
    return new Promise((resolve, reject) => {
        conn.query("insert into Phones ( name, brand , proc, screen, screen_type, camera, os, ram, rom) values (?,?,?,?,?,?,?,?,?)",
            [req.body.name, req.body.brand, req.body.proc, req.body.screen, req.body.screen_type,
                req.body.camera, req.body.os, req.body.ram, req.body.rom],
            function (err, result, fields) {
                if (err) reject(err);
                resolve(result);
            });
    });
}


