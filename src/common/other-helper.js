require("dotenv").config();
const Tokens = require("./../models/tokens");
const Users = require("./../models/users");
const Countries = require("./../models/countries");
const Markets = require("./../models/markets");
const jwt = require('jsonwebtoken');

const randomStr = (length) => {
	let result           = '';
	let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++ ) {
		 result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

const getTime = () => {
	let dateNow = Math.round(new Date().getTime() / 1000);
	return dateNow;
}

const delayTime = (time) => {
    
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('delay');
			resolve();
		}, time * 1000)
	})
}

const api = async (req, res, next) => {
	console.log('req.url: ', req.url);
	if(req.url == '/users/register' || req.url == '/users/login' || req.url == '/users/getUserData'){
		next();
		return
	}

	// console.log('req headers: ', req.headers);
	// let {userId, token, tokenId} = JSON.parse(req.headers['x-access-token']);
	const decodedData = await decodeToken(req.headers['x-access-token']);
	if(decodedData.error){
		return res.status(500).json({
			error: true,
			message: "Decode token error.",
		});	
	}
	console.log('decoded data: ', decodedData);
	const {userId, token, tokenId} = decodedData.userData;
	// if(process.env.NODE_ENV == 'dev'){
		
				
	// }

	if(Tokens.sessions[userId] == null){
		const tokenRes = await Tokens.getTokenById(tokenId);
		// const users = await Users.getUserByUsername(username);
		if (tokenRes.error) {
			console.log("Token Error: ", tokenRes.message);
			return res.status(500).json({
				error: true,
				message: "Token error.",
			});
		}
		
		const tokens = tokenRes[0];
		console.log('token res: ', tokenRes);
		// Check if token exist
		if(tokens.length == 0){
			
			return res.status(500).json({
				error: true,
				message: "Token does not exist.",
			});
		}
		console.log('tokens:', tokens);
		const tokenDb = tokens[0];
		if(tokenDb.token != token){
			console.log('token db:', tokenDb);
			console.log('token token: ', token);
			return res.status(500).json({
				error: true,
				message: "Incorrect token.",
			}); 	
		}

		Tokens.initiateSession(token, userId, tokenId);
	}

	if(Users.sessions[userId] == null){
		const userRes = await Users.getUserById(userId);
		// const users = await Users.getUserByUsername(username);
		if (userRes.error) {
			console.log("User Error: ", userRes.message);
			return res.status(500).json({
				error: true,
				message: "User error.",
			});
		}	

		const users = userRes[0];
		if(users.length == 0){
			
			return res.status(500).json({
				error: true,
				message: "User does not exist.",
			});
		}
		
		let user = users[0];
		Users.initiateSession(userId, user.username);
		let countryRes = await Countries.getCountryByUserId(userId);

		if (countryRes.error) {
			console.log("Country Error: ", countryRes.message);
			return res.status(500).json({
				error: true,
				message: "Country error.",
			});
		}	

		const countries = countryRes[0];
		if(countries.length != 0){
			let country = countries[0];
			if(Countries.sessions[country.id] == null){
				console.log('country: ', country);
				Countries.initiateSession(
					userId, 
					country.id, 
					country.land, 
					country.networth, 
					country.cash, 
					JSON.parse(country.allbuildings), 
					JSON.parse(country.allresearch), 
					JSON.parse(country.allmilitary)
				)
			}

			Users.sessions[userId].countryId = country.id;
			
		}
	}
	
	req.body.userId = userId;
	next();
	
}

const apiMiddleware = async (req, res, next) => {
	Users.requestCount ++;
	await api(req, res, next)
	Users.requestCount --;
}

const decodeToken = async (token) => {
	
	
	if (!token) {
		return {
			error: true,
			message: 'Token is null.'
		}			
	}

	console.log("xheaders: ", token);
	let data = await verifyToken(token, process.env.TOKEN_SECRET);
	if(data.error){
		return {
			error: true,
			message: data.error.message
		}
	}

	
	return data;
}

const verifyToken = (token, secret) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (err, decodedData) => {
			if (err) {
				// resolve({status: 0, payload: err});
				// callback(err, null);
				console.log("err: ", err);
				resolve({error: true, message: err});
			} else {
				// console.log('decoded data: ', decodedData);
				// resolve({status: 1, payload: decodedData});
				resolve(decodedData);
			}
		});
	});
}

const initiateMarket = async () => {
	const goodsAvail = Markets.goodsAvail;
	initateMarketItem('troops');
	initateMarketItem('tanks');
	
	
}

const initateMarketItem = async (itemName) => {
	const itemsRes = await Markets.getLowestPriceByItem(itemName);
	if(!itemsRes.error){
		const items = itemsRes[0];
		if(items.length > 0){
			const item = items[0];
			goodsAvail[itemName].amt = item[itemName];
			goodsAvail[itemName].price = item[itemName + 'price'];
			goodsAvail[itemName].marketId = item.id;
		}
		
	}
}


module.exports = {
	getTime,
	randomStr,
	apiMiddleware,
	delayTime,
	initiateMarket
};