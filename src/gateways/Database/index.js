const sql = require('mssql')

async function init() {

    let config = {
        driver: process.env.DEV_DB_DRIVER,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        database: process.env.DB_DATABASE,
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

    if (process.env.NODE_ENV === "dev" || process.env.APP_ENV === "dev") {
        config.user = process.env.DEV_DB_USER;
        config.password = process.env.DEV_DB_PASSWORD;
        config.server = process.env.DEV_DB_SERVER;
        config.database = process.env.DEV_DB_DATABASE;
    }

    const DB_KEY = Symbol.for("MyApp.db");
    const globalSymbols = Object.getOwnPropertySymbols(global);
    const hasDb = globalSymbols.indexOf(DB_KEY) > -1;

    if (!hasDb) {
        return global[DB_KEY] = await sql.connect(config);
    } else {
        return global[DB_KEY];
    }
}

export default { getInstance: () => init() };