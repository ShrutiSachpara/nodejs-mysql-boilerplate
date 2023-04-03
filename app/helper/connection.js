const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database : 'boiler'
})

con.connect(function(error){
    if(error) throw error;
    console.log("mysql connected...");
})

module.exports = con;