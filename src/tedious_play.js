var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var async = require('async');

// npm run tedious
module.exports.init = function () {
    // Create connection to database
    var config = {
        server: 'localhost',
        authentication: {
            type: 'default',
            options: {
                userName: 'sa', // update me
                password: 'P@55w0rd' // update me
            }
        },
        options: {
            database: 'nhs_virtual_visit_dev',
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            validateBulkLoadParameters: false,
            truestedConnection: true,
            enableArithAbort: true,
            integratedSecurity: true,
            trustServerCertificate: true,
            rowCollectionOnDone: true
        }
    }

    var connection = new Connection(config);

    connection.connect(function (err) {
        console.log('testing')

        request = new Request("Select * from dbo.[user];", function (err) {
            if (err) {
                console.log(err);
            }
        });
        var result = "";
        request.on('row', function (columns) {
            columns.forEach(function (column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    result += column.value + " ";
                }
            });
            console.log(result);
            result = "";
        });

        request.on('done', function (rowCount, more) {
            console.log(rowCount + ' rows returned');
        });
        connection.execSql(request);

        // var request = new Request("Select * from dbo.[user]", function(err, rowCount, rows) {
        //     console.log(rowCount);
        //     console.log(JSON.stringify(rows))
        // });
        // connection.execSql(request);

        // connection.execSql(new Request('SELECT * FROM Products', function (err, rowCount, rows) {
        //     if (err) {
        //         throw err;
        //     }
        // })
        //     .on('doneInProc', function (rowCount, more, rows) {
        //         console.log(more, rows[0], rowCount); // not empty
        //     }));
    });

    // Attempt to connect and execute queries if connection goes through
    connection.on('connect', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected');
        }
    });
}