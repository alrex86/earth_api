import db from "../config/db";
import jwt from "jsonwebtoken";
import { userTokenDataType } from "../common/types";

type newTokenType = {
  token: string;
  userid: number;
  id: number;
};

const Tokens = {
  dbName: "tokens",
  secret: "hey",
  tokensData: {},
  // verifyToken: (nam: string) => {
  //     return nam
  // },
  createToken: (token: string, userID: number): Promise<number> => {
    let newToken: newTokenType = {
      token: token,
      userid: userID,
      id: 0,
    };
    // console.log('connection: ', db.connection);
    // let query = "INSERT INTO users set ?", newUser, (err, res) => {}
    return new Promise((resolve, reject) => {
      db.dbData.connection.query(
        "INSERT INTO " + Tokens.dbName + " set ?",
        newToken,
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            // result(err, null);
          } else {
            // console.log("user res: ", res);
            // resolve(res.insertId);
          }
        }
      );
    });
  },
  getTokenByUserID: (userID: number): Promise<newTokenType> => {
    return new Promise((resolve, reject) => {
      db.dbData.connection.query(
        "SELECT * FROM " + Tokens.dbName + " WHERE userid = ?",
        [userID],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            // result(err, null);
          } else {
            // console.log("user res: ", res);
            let resF = <newTokenType[]>res
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
  getTokenByTokenID: (tokenID: number): Promise<newTokenType> => {
    return new Promise((resolve, reject) => {
      db.dbData.connection.query(
        "SELECT * FROM " + Tokens.dbName + " WHERE id = ?",
        [tokenID],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            // result(err, null);
          } else {
            // console.log("user res: ", res);
            let resF = <newTokenType[]>res
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
  decodeToken: async (req: any): Promise<userTokenDataType> => {
    let decodedData: userTokenDataType = null;
    let token = req.headers["x-access-token"];
    if (token != null && token != "") {
      console.log("xheaders: ", token);
      let data = await Tokens.verifyToken(token, Tokens.secret);

      decodedData = data.userData;
    }

    return decodedData;
  },
  verifyToken: (token: string, secret: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decodedData) => {
        if (err) {
          // resolve({status: 0, payload: err});
          // callback(err, null);
          console.log("err: ", err);
          resolve(null);
        } else {
          // console.log('decoded data: ', decodedData);
          // resolve({status: 1, payload: decodedData});
          resolve(decodedData);
        }
      });
    });
  },
};

export default Tokens;
