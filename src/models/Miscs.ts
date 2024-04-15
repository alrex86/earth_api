
import { responseType } from "../Common/types";
import Users from "./Users";
import { userTokenDataType } from "../types";
import Tokens from "./Tokens";
import Countries from "./Countries";

const Miscs = {
    
    
    randomStr: (length: number): string => {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    getTime: (): number => {
        let dateNow = Math.round(new Date().getTime() / 1000);
        return dateNow;
    },
    // API.res = function(status, code, message, payload, res){
    //     res.send({status: status, code: code, message: message, payload: payload})
    //     // return {status: status, code: code, message: message, payload: payload};
    // }
    createResponse: (): responseType => {
        let response: responseType = {
            status: 1,
            code: 0,
            message: '',
            payload: null
        }

        return response;
    },
    API1: async (req: any, userData: userTokenDataType): Promise<responseType> => {
        let response = Miscs.createResponse();
        let success = 1;
        let code = 5;
        let result = false;

        if(Users.usersData.userSessions[userData.userID] != null){
            
            result = await Miscs.checkTokenSession(userData);
                // req.body.userID = userData.userID;
            if(!result){
                success = 0;
            }
            
            
            
            
            
            
            
        }else{
            console.log('user session is null')
            result = await Users.initiateUserSession(userData.userID);
            let countryID = await Countries.initiateCountrySession(userData.userID)
            Users.setCountryID(countryID, userData.userID);
            // let result = await Miscs.apiTokenNull(userData);
            if(result){
                
                result = await Miscs.checkTokenSession(userData);
                // req.body.userID = userData.userID;
                if(!result){
                    success = 0;
                }
            }else{
                success = 0;
            }
            
            
            
        }
        
        if(success == 1){
            
            
            req.body.userID = userData.userID;
        }

        response.code = code;
        response.status = success;
        return response;    
    },

    checkTokenSession: async (userData: userTokenDataType): Promise<boolean> => {
        let success = true;
        if(Users.usersData.tokenSessions[userData.tokenID] != null){
            if(Users.usersData.tokenSessions[userData.tokenID].token != userData.token){
                success = false;
                
            }
        }else{
            let token = await Tokens.getTokenByTokenID(userData.tokenID);
        
            if(token != null){
                
                if(token.token == userData.token){
                    Users.setTokenSession(token.id, token.token, token.userid);
                    // Users.usersData.tokenSessions[userData.tokenID] = {
                    //     id: token.id,
                    //     token: token.token,
                    //     userID: token.userid
                    // } 
                }else{
                    success = false;
                }
                  
                
            }else{
                success = false;
            }
        }

        return success;
    },
    

    
}

export default Miscs;