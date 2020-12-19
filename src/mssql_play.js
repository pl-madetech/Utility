const sql = require('mssql')

// npm run mssql
module.exports.init = function () {

    const config = {
        user: 'sa',
        password: 'P@55w0rd',
        server: 'localhost',
        database: 'nhs_virtual_visit_dev',
        options: {
            encrypt: true,
            validateBulkLoadParameters: false,
            truestedConnection: true,
            enableArithAbort: true,
            integratedSecurity: true,
            trustServerCertificate: true,
            rowCollectionOnDone: true
        }
    }

    sql.on('error', err => {
        console.error('On Error: ', err);
    })

    sql.connect(config).then(pool => {
        // Query
        return pool.request()
            .query('select * from dbo.[user]')
    }).then(result => {
        console.dir(result);

        result.recordset.forEach(function (element) {
            console.log(element.id);
            console.log(element.password);
        });

    }).catch(err => {
        console.error('Catch err: ', err);
    });
}