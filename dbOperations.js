const sql = require('mssql')
var webconfig = {
    user: 'adisko88',
    password: 'kavitr.12',
    server: 'MEDIPOL.mssql.somee.com',
    database: 'MEDIPOL',
    port: 1433
};
const pool2 = new sql.ConnectionPool(webconfig)
const pool2Connect = pool2.connect()

pool2.on('error', err => {
    console.log(err);
})

module.exports.addParams = function (req, res) {
    return pool2Connect.then((pool) => {
        pool.request().query("insert into tbl_degerler VALUES (" + req.query.sicaklik + "," + req.query.nem + "," + req.query.karbondioksit + ")", function (err, data) {
            if (err) {
                console.log(err);
            }
        });
        pool.request().query("select * from tbl_degerler", function (err, data) {
            if (err) {
                console.log(err);
            }
            res.render('home', { data: data.recordset });
        });
    }).catch(err => {
        // ... error handler
    });

}