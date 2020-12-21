var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

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
        if (err) console.error(err);

        req = new Request("Select * from dbo.[user];", function (err) {
            if (err) {
                console.log(err);
            }
        });
        var result = "";
        req.on('row', function (columns) {
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

        req.on('done', function (rowCount) {
            console.log(rowCount + ' rows returned');
        });
        connection.execSql(req);
    });

    // Attempt to connect and execute queries if connection goes through
    connection.on('connect', function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('Connected');
        }
    });
}