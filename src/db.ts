import mysql from 'mysql';
import { dbType } from './types';
// const API = require('./API');
//local mysql db connection

const dbData = {
    connection: null as mysql.Connection,
    

}

const db = {
    dbData: dbData,
    createConnection: () => {
        db.dbData.connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'hey',
            database : 'earth',
            port: 3308
        });     
    },
    createTables: () => {
        let query = "CREATE TABLE IF NOT EXISTS users (id INT(11) AUTO_INCREMENT PRIMARY KEY, username VARCHAR(16) NOT NULL, password VARCHAR(100) NOT NULL, bidbal INT(11) NOT NULL)";
        db.dbData.connection.query(query, (err, result) => {
            if (err) throw err;
            console.log("Table created");    
        })
        
        query = "CREATE TABLE IF NOT EXISTS tokens (id INT(11) AUTO_INCREMENT PRIMARY KEY, userid INT(11) NOT NULL, token VARCHAR(5) NOT NULL)";
        db.dbData.connection.query(query, (err, result) => {
            if (err) throw err;
            console.log("Table created");    
        })

        query = "CREATE TABLE IF NOT EXISTS countries (id INT(11) AUTO_INCREMENT PRIMARY KEY, userid INT(11) NOT NULL, allbuildings VARCHAR(500) NOT NULL, allresearch VARCHAR(500) NOT NULL, land INT(11) NOT NULL, networth INT(11) NOT NULL, cash INT(11) NOT NULL, name VARCHAR(20) NOT NULL)";
        db.dbData.connection.query(query, (err, result) => {
            if (err) throw err;
            console.log("Table created");    
        })
    }
}


// db.connection = null;
// db.createConnection = function(){
    
//     db.connection = mysql.createConnection({
//         host     : 'localhost',
//         user     : API.mysql.user,
//         password : API.mysql.password,
//         database : 'sosyal',
//         port: API.mysql.port
//     });

//     db.connection.connect(function(err) {
//         if (err) throw err;
//     });
// }


export default db;