const Country = require("./../models/countries");
const User = require("./../models/users");

const {
  ALL_BUILDINGS,
  ALL_MILITARY,
  ALL_RESEARCH,
} = require("./../common/enums/country");

const createCountry = async (req, res) => {
  const { name, userId } = req.body;
  if (!name)
    return res.status(400).json({
      error: true,
      message: "Invalid request. Please supply missing id and name.",
    });

  // check if user has an existing country
  const [rows] = await Country.getCountryByUserId(userId);
  if (rows.length > 0)
    return res.status(400).json({
      error: true,
      message: "Unable to create country. User has an existing one.",
    });

  const country = {
    allBuildings: ALL_BUILDINGS,
    allResearch: ALL_RESEARCH,
    allMilitary: ALL_MILITARY,
    land: 0,
    networth: 0,
    population: 0,
    cash: 10000,
    name: name,
    exploredLand: 0,
    exploreRate: 50,
  };

  const payload = {
    userid: userId,
    allbuildings: JSON.stringify(ALL_BUILDINGS),
    allresearch: JSON.stringify(ALL_RESEARCH),
    allmilitary: JSON.stringify(ALL_MILITARY),
    land: country.land,
    networth: country.networth,
    cash: country.cash,
    population: country.population,
    name: name,
  };

  const createdCountry = await Country.createCountry(payload);
  if (createCountry.error) {
    console.log("Country Creation Error: ", createCountry.message);
    return res.status(500).json({
      error: true,
      message: "Unable to create country. Please contact support team.",
    });
  }

  res.json(createdCountry);
};

const build = async (req, res) => {
  const { amtsStr, userId } = req.body;

  

  
  
  if(!amtsStr)
    return res.status(400).json({
      error: true,
      message: "Invalid request. Please supply missing fields.",
    });
  try {
    const amts = JSON.parse(amtsStr);
    console.log('amts: ', amts);
    if(amts.farm == null || amts.business == null){
      return res.status(400).json({
        error: true,
        message: "Invalid request. Invalid amts.",
      });  
    }

    let totalAmt = 0;
    for(amt in amts){
      amts[amt] = parseInt(amts[amt]);
      if(amts[amt] == NaN){
        amts[amt] = 0;
        
      } 

      totalAmt = totalAmt + amts[amt];
      
    }

    if(totalAmt == 0){
      return res.status(400).json({
        error: true,
        message: "No buildings to build.",
      }); 
    }
    // console.log('business amt: ', parseInt(amts.business));
    // if(farmAmt == 0 && businessAmt == 0 && reasearchLabAmt == 0){
    //   return res.status(400).json({
    //     error: true,
    //     message: "No building to build.",
    //   }); 
    // }
    
    // let amts = {
    //   farm: farmAmt,
    //   business: businessAmt,
    //   researchLab: reasearchLabAmt
    // }
  
    let buildRes = Country.build(amts, User.sessions[userId].countryId);
    
    
    console.log('build res:', buildRes);
  
    res.json(buildRes);
  } catch (error) {
    console.log('error: ', error);
    return res.status(400).json({
      error: true,
      message: "Wrong object",
    }); 
  }

  
};

const sell = async (req, res) => {
  const { amtsAndPricesStr, userId } = req.body;

  

  
  
  if(!amtsAndPricesStr)
    return res.status(400).json({
      error: true,
      message: "Invalid request. Please supply missing fields.",
    });
  try {

    const amtsAndPrices = JSON.parse(amtsAndPricesStr);
    if(amtsAndPrices.amts == null || amtsAndPrices.prices == null){
      return res.status(400).json({
        error: true,
        message: "Invalid request. Invalid inputs.",
      });  
    }

    const amts = amtsAndPrices.amts;
    console.log('amts: ', amts);
    if(amts.farm == null || amts.business == null){
      return res.status(400).json({
        error: true,
        message: "Invalid request. Invalid amts.",
      });  
    }

    let totalAmt = 0;
    for(amt in amts){
      amts[amt] = parseInt(amts[amt]);
      if(amts[amt] == NaN){
        amts[amt] = 0;
        
      } 

      totalAmt = totalAmt + amts[amt];
      
    }

    if(totalAmt == 0){
      return res.status(400).json({
        error: true,
        message: "No goods or tech to sell.",
      }); 
    }
    
    const prices = amtsAndPrices.prices;
    if(prices.farm == null || prices.business == null){
      return res.status(400).json({
        error: true,
        message: "Invalid request. Invalid amts.",
      });  
    }

    for(price in prices){
      prices[price] = parseInt(prices[price]);
      if(prices[price] == NaN){
        prices[price] = 0;
        
      } 

      
      
    }
    
  
    let buildRes = Country.build(amts, User.sessions[userId].countryId);
    
    
    console.log('build res:', buildRes);
  
    res.json(buildRes);
  } catch (error) {
    console.log('error: ', error);
    return res.status(400).json({
      error: true,
      message: "Wrong object",
    }); 
  }

  
};

const buy = async (req, res) => {
  const { amtsAndPricesStr, userId } = req.body;

  

  
  
  if(!amtsAndPricesStr)
    return res.status(400).json({
      error: true,
      message: "Invalid request. Please supply missing fields.",
    });
  try {

    const amtsAndPrices = JSON.parse(amtsAndPricesStr);
    if(amtsAndPrices.amts == null || amtsAndPrices.prices == null){
      return res.status(400).json({
        error: true,
        message: "Invalid request. Invalid inputs.",
      });  
    }

    const amts = amtsAndPrices.amts;
    console.log('amts: ', amts);
    if(amts.farm == null || amts.business == null){
      return res.status(400).json({
        error: true,
        message: "Invalid request. Invalid amts.",
      });  
    }

    let totalAmt = 0;
    for(amt in amts){
      amts[amt] = parseInt(amts[amt]);
      if(amts[amt] == NaN){
        amts[amt] = 0;
        
      } 

      totalAmt = totalAmt + amts[amt];
      
    }

    if(totalAmt == 0){
      return res.status(400).json({
        error: true,
        message: "No goods or tech to buy.",
      }); 
    }
    
    const prices = amtsAndPrices.prices;
    if(prices.farm == null || prices.business == null){
      return res.status(400).json({
        error: true,
        message: "Invalid request. Invalid amts.",
      });  
    }

    for(price in prices){
      prices[price] = parseInt(prices[price]);
      if(prices[price] == NaN){
        prices[price] = 0;
        
      } 

      
      
    }
    
    
    let buildRes = Country.build(amts, User.sessions[userId].countryId);
    
    
    console.log('build res:', buildRes);
  
    res.json(buildRes);
  } catch (error) {
    console.log('error: ', error);
    return res.status(400).json({
      error: true,
      message: "Wrong object",
    }); 
  }

  
};

module.exports = {
  createCountry,
  build,
  sell,
  buy
};
