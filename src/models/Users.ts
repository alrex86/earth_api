import db from "../config/db";
import { userDBType, userSessionsType, newUserType } from "../common/types";

type tokenSessionType = {
  id: number;
  token: string;
  userID: number;
};

type userSessions = {
  [id: number]: userSessionsType;
};

type tokenSessions = {
  [id: number]: tokenSessionType;
};

const usersData = {
  userSessions: {} as userSessions,
  tokenSessions: {} as tokenSessions,
};

const Users = {
  dbName: "users",
  usersData: usersData,
  createUser: (username: string, password: string) => {
    let user: newUserType = {
      username: username,
      bidbal: 0,
      password: password,
    };
    // console.log('connection: ', db.connection);
    // let query = "INSERT INTO users set ?", newUser, (err, res) => {}
    return new Promise((resolve, reject) => {
      db.dbData.connection.query(
        "INSERT INTO " + Users.dbName + " set ?",
        user,
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            resolve(0);
            // result(err, null);
          } else {
            console.log("user res: ", res);
            // resolve(res.insertId);
          }
        }
      );
    });
  },

  getUserByUsername: (username: string): Promise<userDBType> => {
    return new Promise((resolve, reject) => {
      db.dbData.connection.query(
        "SELECT * FROM " + Users.dbName + " WHERE username = ?",
        [username],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            // result(err, null);
          } else {
            // console.log("user res: ", res);
            // if (res.length > 0) {
            //   resolve(res[0]);
            // } else {
            //   resolve(null);
            // }
          }
        }
      );
    });
  },
  getUserByUserID: (id: number): Promise<userDBType> => {
    return new Promise((resolve, reject) => {
      db.dbData.connection.query(
        "SELECT * FROM " + Users.dbName + " WHERE id = ?",
        [id],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            // result(err, null);
          } else {
            
            
            // console.log("user res: ", result);
            
            let resF = <userDBType[]>res;

            // resolve(resF[0]);
            // console.log('res: ', res1[0]);
            if (resF.length > 0) {
              resolve(resF[0]);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  },
  initiateUserSession: async (userID: number): Promise<boolean> => {
    let success = true;
    let user = await Users.getUserByUserID(userID);
    // console.log('user: ', user[0].username);
    console.log('user: ', user.username);
    if (user != null) {
      Users.usersData.userSessions[userID] = {
        id: user.id,
        username: user.username,
        token: "",
        password: "",
        countryID: 0,
      };
    } else {
      success = false;
    }

    return success;
  },
  setTokenSession: (tokenID: number, token: string, userID: number) => {
    Users.usersData.tokenSessions[tokenID] = {
      id: tokenID,
      token: token,
      userID: userID,
    };
  },
  setCountryID: (countryID: number, userID: number) => {
    Users.usersData.userSessions[userID].countryID = countryID;
  },
  // getUserInSessions: (userID: number): userSessionsType => {
  //     let session: userSessionsType = null;
  //     for(let i = 0; i < usersData.userSessions.length; i ++){
  //         if(usersData.userSessions[i].id == userID){
  //             session = usersData.userSessions[i];
  //             i = usersData.userSessions.length;
  //         }
  //     }

  //     return session;
  // },
  // getUserInSessionsByToken: (token: string): userSessionsType => {
  //     let session: userSessionsType = null;
  //     for(let i = 0; i < usersData.userSessions.length; i ++){
  //         if(usersData.userSessions[i].token == token){
  //             session = usersData.userSessions[i];
  //             i = usersData.userSessions.length;
  //         }
  //     }

  //     return session;
  // },
};

export default Users;
