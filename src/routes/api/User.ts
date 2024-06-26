import express from 'express';
import Users from '../../models/Users';
import Tokens from '../../models/Tokens';
import Miscs from '../../models/Miscs';
import jwt from 'jsonwebtoken';
import { userTokenDataType } from '../../types';
import Countries from '../../models/Countries';


const router = express.Router();

router.post('/login', async (req, res) => {
    console.log("\nLOGIN\n");
    console.log('req.body: ', req.body);
    let response = Miscs.createResponse();
    

    let user = await Users.getUserByUsername(req.body.username);
    console.log('user:' , user);
    if(user != null){

        let token = Miscs.randomStr(5);
        let tokenID = await Tokens.createToken(token, user.id);
        // Users.usersData.userSessions[user.id] = {
        //     id: user.id,
        //     username: user.username,
        //     password: user.password,
        //     token: token
        // }
        // let userSession: userSessionsType = {
            
        // }
        // let userData = Users.createUserData(user[0].userid, siteID, 1, newToken.token, newToken.id, username, 147, user[0].admin);
        let userData: userTokenDataType = {
            userID: user.id,
            siteID: 1,
            username: user.username,
            authority: 1,
            token: token,
            tokenID: tokenID,
            country: 5,
            admin: 1
        } 

        let jwtToken = jwt.sign({userData: userData}, Tokens.secret); 
        
        // Users.usersData.userSessions.push(userSession);
        response.message = 'User logged in succesfully.';
        response.payload = jwtToken;
        
        res.send(response);
    }

    console.log('users: ', Users.usersData);
    
    
    
});

router.post('/getUserData', async (req, res) => {
    console.log("\nGET USER DATA\n");
    console.log('req.body: ', req.body);
    
    let response = Miscs.createResponse();
    let user = Users.usersData.userSessions[req.body.userID];
    let country = Countries.countriesData.countries[user.countryID];

    if(user != null){

        let payload = {
            user: user,
            country: country 
        }
        
        response.payload = payload;
        response.message = 'Get user data successful.';
        res.send(response);
    }

    // console.log('users: ', Users.usersData);
    
    
    
});

router.post('/register', async (req, res) => {
    console.log("\nREGISTER\n");
    console.log('req.body: ', req.body);
    
    
    // let user = Users.usersData[].getUserInSessions(req.body.userID);
    
    // if(user != null){
        

    //     res.send({user});
    // }

    // console.log('users: ', Users.usersData);
    
    
    
});

const User = {router}

export default User;