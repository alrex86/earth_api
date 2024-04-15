import express from 'express';
import cors from 'cors';
import db from './db';
import path from 'path';
import User from './routes/api/User';
import Game from './routes/api/Game';
import MainRoutes from './models/MainRoutes';


const app = express();


app.use( express.static( `${__dirname}/dist` ) );
db.createConnection();
// console.log('connection: ', dbFull.db.connection);
db.dbData.connection.connect((err) => {
    if(err){
        console.log(err);
    }else{
        console.log('connection connected');
        db.createTables();   
        
    }
});



const allowedOrigins: string[] = ['http://localhost:5173','http://192.168.143.16:5000'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

app.use(cors());

app.use(express.json());
app.use('/api', MainRoutes.apiRoute);
app.use('/api/user', User.router);
app.use('/api/game', Game.router);

// app.get('/', () => {
//     console.log('intro');
// });

app.get('/', (req, res)=>{
    // console.log('password: ', req.params.password);
    console.log('get files');
    res.sendFile(path.join(__dirname, 'dist/index.html'));
    // if(Misc.checkPasswordAndIP(req.params.password, API.adminUser.sitePass, 0)){
    // res.send('hi sosyal');
    // }else{
    //   res.send('Invalid');
    // }
    
})

app.post('/api/test', (req, res)=>{
    // console.log('password: ', req.params.password);
    console.log('get files');
    
    // if(Misc.checkPasswordAndIP(req.params.password, API.adminUser.sitePass, 0)){
    // res.send('hi sosyal');
    // }else{
    //   res.send('Invalid');
    // }
    
})


app.listen(5000, () => {
    console.log('server running');
})