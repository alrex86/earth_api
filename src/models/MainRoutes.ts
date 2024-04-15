
import Tokens from "./Tokens"
import Miscs from "./Miscs"



const MainRoutes = {
    
    apiRoute: async function (req: any, res: any, next: any) {
        console.log('\n************************************************API ROUTE*******************************\n');
        
        let response = Miscs.createResponse();
        let canProceed = true;
        // let token = req.headers['x-access-token'];
        // let userSession = Users.getUserInSessionsByToken(token);
        if(req.url != '/user/login' && req.url != '/test'){
            let userData = await Tokens.decodeToken(req);
            if(userData != null){
                if(userData.authority == 1){

                
                    response = await Miscs.API1(req, userData);
                    if(response.status == 0){
                        canProceed = false;
                    }
                    console.log('response: ', response);
                    console.log('req URL:', req.url);

                    
                    
                }   
            }else{
                canProceed = false;
            }           
        }
        
        
        
        if(canProceed){
            // console.log('check upload: ', checkForUploadHeaders);
            // success = Miscs.checkForUploadHeaders(req, userData);
            // code = 5;
            next();
        } 
        
        
    },
    
    

    
}

export default MainRoutes;