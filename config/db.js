// config/db.js
const sql = require("mssql");
const dbSettings = require('../dbSettings');

console.log(dbSettings.DB_USER);
console.log(dbSettings.DB_PASSWORD);
console.log(dbSettings.DB_SERVER);
console.log(dbSettings.DB_PORT);
console.log(dbSettings.DB_DATABASE);

const config = {
  user: dbSettings.DB_USER,
  password: dbSettings.DB_PASSWORD,
  server: dbSettings.DB_SERVER,
  //here I added port which is usee for only wise grab web
  port: parseInt(dbSettings.DB_PORT),
  database: dbSettings.DB_DATABASE,
  options: {
    encrypt: true, // Use encryption
    enableArithAbort: true,
    trustServerCertificate: true, // Add this line to trust the self-signed certificate
    connectionTimeout: 30000,
  },
};

sql.on("error", (err) => {
  console.error("SQL Error:", err);
});

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed: ", err));

module.exports = {
  sql,
  poolPromise,
};
