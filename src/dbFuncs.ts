import mysql from 'mysql';
import { dbType } from './types';
// const API = require('./API');
//local mysql db connection

const dbFuncs = {
    
    createConnection: (db: dbType) => {
        db.connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'hey',
            database : 'earth',
            port: 3308
        });  

        // console.log('connection: ', connection);
        // connection.connect((err) => {
        //     if(err){
        //         console.log(err);
        //     }else{
        //         let query = "CREATE TABLE IF NOT EXISTS users (id INT(11) AUTO_INCREMENT PRIMARY KEY, username VARCHAR(16) NOT NULL, bidbal INT(11) NOT NULL)";
        //         connection.query(query, (err, result) => {
        //             if (err) throw err;
        //             console.log("Table created");    
        //         })
        
                
        //     }
        // });
    },

    createTables: (db: dbType) => {
        let query = "CREATE TABLE IF NOT EXISTS users (id INT(11) AUTO_INCREMENT PRIMARY KEY, username VARCHAR(16) NOT NULL, password VARCHAR(100) NOT NULL, bidbal INT(11) NOT NULL)";
        db.connection.query(query, (err, result) => {
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


export default dbFuncs;