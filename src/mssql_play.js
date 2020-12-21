const sql = require('mssql')

const config = {
    user: 'nhssqlserverless',
    password: 'Pf,G=!R.;bb,L8Vp',
    server: 'nhsvirtualvisitdev.database.windows.net',
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

// npm run mssql
module.exports.init = function () {

    // Add a retry mecanishm since it's a serverless store.
    sql.on('error', err => {
        console.error('On Error: ', err);
    })

    sql.connect(config).then(pool => {
        return pool.request().query('select * from dbo.[user]')
    }).then(result => {
        console.dir(result);
    }).then(() => {
        return sql.close();
    }).catch(err => {
        console.error('Catch err: ', err);
    });

    sql.connect(config).then(pool => {
        return pool.request().query('select * from dbo.[user] where id = 1')
    }).then(result => {
        console.dir(result);
    }).then(() => {
        return sql.close();
    }).catch(err => {
        console.error('Catch err: ', err);
    });
}