const db = require("./../common/db-helper");

const Market = {
  goodsAvail: {
    troops: {
      amt: 0,
      price: 0,
      marketId: 0
    },
    tanks: {
      amt: 0,
      price: 0,
      marketId: 0  
    },
    turrets: {
      amt: 0,
      price: 0,
      marketId: 0  
    }
  },
  createMarket: async (userID, troops, jets, tanks, turrets, troopsPrice, tanksPrice) => {
    const payload = {
      
      userid: userID,
      troops: troops,
      jets,
      tanks,
      turrets,
      troopsprice: troopsPrice,
      tanksprice: tanksPrice
    };

    try {
      return await db.query("INSERT INTO markets set ?", payload);
    } catch (err) {
      return { error: true, message: err.message };
    }
  },
  getLowestPriceByItem: async (itemName) => {
    const payload = [
      itemName,
    ]
  
    try {
      return await db.query(`SELECT ${itemName}, ${itemName}price FROM markets WHERE ${itemName} > 0 ORDER BY ${itemName}price LIMIT 1`, payload);
    } catch (err) {
      return { error: true, message: err.message };
    }
  },
  replenishItem: async (itemName) => {
    const goodsAvail = Market.goodsAvail; 
    const marketRes = await Market.getLowestPriceByItem(itemName)
    if(!marketRes.error){
      const markets = marketRes[0];
      if(markets.length > 0){
        const market = markets[0];
        goodsAvail[itemName].amt = market[itemName];
        goodsAvail[itemName].price = market[itemName + 'price'];
        goodsAvail[itemName].marketId = market.id;
      }
    }
  },
  initiateSession: (token, userID, tokenID) => {
    Token.sessions[tokenID] = {
			token: token,
			userID: userID,
			tokenID: tokenID
    }
    
  },
  
};

module.exports = Market;