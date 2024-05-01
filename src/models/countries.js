const db = require("../common/db-helper");
const Market = require("./markets");

const Country = {
  sessions: {},
  buildingCost: 5000,
  createCountry: async (payload) => {
    try {
      return await db.query("INSERT INTO countries set ?", payload);
    } catch (err) {
      return { error: true, message: err.message };
    }
  },
  getCountryByUserId: async (userId) => {
    const payload = {
      userId,
    };
  
    try {
      return await db.query("SELECT * FROM countries WHERE ?", payload);
    } catch (err) {
      return { error: true, message: err.message };
    }
  },
  useTurn: (countryID) => {
    

    let country = Country.sessions[countryID];
    if(country.turns > 0){
      let riceProduced = country.allBuildings.farm.amt * 50;
      let riceConsumed = country.population * 50;
      let netRice = riceProduced - riceConsumed;
      
      
      return {
        riceProduced,
        riceConsumed,
        netRice
      };
    }else{
      return null
    }
    
  },
  getBuildingsPerTurn: (countryID) => {
    let country = Country.sessions[countryID];

    return 4 + Math.floor(country.allBuildings.constructionSite.amt / 4);
  },
  getResearchPerTurn: (countryID) => {
    let country = Country.sessions[countryID];

    return country.allBuildings.researchLab.amt * 3;
  },
  build: (
    amts,
    countryID
  ) => {
    allBuildingsBuilt = [];
    allTurns = [];
    
    let buildingsPerTurn = Country.getBuildingsPerTurn(countryID);
    let buildingsPerTurnLeft = 0;
    let country = Country.sessions[countryID];
    
    // let amtToBuildFarm = 0;
    // let amtToBuildBusiness = 0;

    
    let maxBuildingsToBuild = 0;
    const amtToBuild = {
      farm: 0,
      business: 0,
      researchLab: 0
    }

    let continueBuilding = true;

    while ((amts.farm != 0) && country.cash >= Country.buildingCost && continueBuilding) {

      
      let turnUsed = Country.useTurn(countryID);
      

      if(turnUsed != null){

        continueBuilding = true;
        buildingsPerTurnLeft = buildingsPerTurn;
        maxBuildingsToBuild = Math.floor(country.cash / Country.buildingCost);
        if(maxBuildingsToBuild < country.land){
          maxBuildingsToBuild = country.land
        }
        if(maxBuildingsToBuild < buildingsPerTurn){
          buildingsPerTurnLeft = maxBuildingsToBuild;
          continueBuilding = false;
        }

        amtToBuild.farm = 0;
        amtToBuild.business = 0;
        amtToBuild.researchLab = 0;

        
        // amtToBuildFarm = 0;
        // amtToBuildBusiness = 0;
        buildingsPerTurnLeft = Country.buildOrResearch(amtToBuild, amts, buildingsPerTurnLeft, countryID, 'farm', false);
        // if (amtFarm > buildingsPerTurn) {
        //   amtToBuildFarm = buildingsPerTurn;
        // } else {
        //   amtToBuildFarm = amtFarm;
        // }

        // buildingsPerTurn = buildingsPerTurn - amtToBuildFarm;
        // amtFarm = amtFarm - amtToBuildFarm;

        // if (amtBusiness > buildingsPerTurn) {
        //   amtToBuildBusiness = buildingsPerTurn;
        // } else {
        //   amtToBuildBusiness = amtBusiness;
        // }

        // buildingsPerTurn = buildingsPerTurn - amtToBuildBusiness;
        // amtBusiness = amtBusiness - amtToBuildBusiness;

        // country.allBuildings.farm.amt =
        //   country.allBuildings.farm.amt + amtToBuildFarm;
        // buildingsBuilt.farm = buildingsBuilt.farm + amtToBuildFarm;
        // country.allBuildings.business.amt =
        //   country.allBuildings.business.amt + amtToBuildBusiness;
        // buildingsBuilt.business = buildingsBuilt.business + amtToBuildBusiness;
        // country.allBuildings.researchLab.amt =
        //   country.allBuildings.researchLab.amt + amtResearch;
        country.cash = country.cash - ((amtToBuild.farm + amtToBuild.business) * Country.buildingCost);
        allBuildingsBuilt.push({
          farm: amtToBuild.farm,
          business: amtToBuild.business
        });
        allTurns.push(turnUsed);   
      }else{
        continueBuilding = false;
      }
      
      
    }

    return {
      allBuildingsBuilt,
      allTurns
    };
  },
  research: (amts, countryID) => {
    allResearchSearched = [];
    allTurns = [];
    
    let researchPerTurn = Country.getResearchPerTurn(countryID);
    let researchPerTurnLeft = 0;
    let country = Country.sessions[countryID];
    
    

    
    
    const amtToResearch = {
      farm: 0,
      business: 0,
      residential: 0
    }

    let continueResearching = true;

    while ((amts.farm != 0) && continueResearching) {

       
      let turnUsed = Country.useTurn(countryID);
      

      if(turnUsed != null){
        researchPerTurnLeft = researchPerTurn;
        amtToResearch.farm = 0;
        amtToResearch.business = 0;
        amtToResearch.residential = 0;

        
        
        researchPerTurnLeft = Country.buildOrResearch(amtToResearch, amts, researchPerTurnLeft, countryID, 'farm', false);
        
        
        allResearchSearched.push({
          farm: amtToResearch.farm,
          business: amtToResearch.business
        });
        allTurns.push(turnUsed); 
      }else{
        continueResearching = false;
      }
      
      



      
    }

    return {
      allBuildingsBuilt,
      allTurns
    };  
  },
  buildBuilding: (
    amtToBuild,
    amts, 
    buildingsPerTurn,  
    countryID, 
    buildingName
  ) => {

    let country = Country.sessions[countryID];
    if (amts[buildingName] > buildingsPerTurn) {
      amtToBuild[buildingName] = buildingsPerTurn;
    } else {
      amtToBuild[buildingName] = amts[buildingName];
    }

    buildingsPerTurn = buildingsPerTurn - amtToBuild[buildingName];
    amts[buildingName] = amts[buildingName] - amtToBuild[buildingName];
    country.allBuildings[buildingName].amt =
      country.allBuildings[buildingName].amt + amtToBuild[buildingName];
    // buildingsBuilt[buildingName] = buildingsBuilt[buildingName] + buildingToBuild.amtToBuildFarm;
    return buildingsPerTurn;

  },
  buildOrResearch: (
    amtToBuildOrResearch,
    amts, 
    buildingsOrResearchPerTurn,  
    countryID, 
    buildingOrResearchName,
    isResearch
  ) => {

    let country = Country.sessions[countryID];
    if (amts[buildingOrResearchName] > buildingsOrResearchPerTurn) {
      amtToBuildOrResearch[buildingOrResearchName] = buildingsOrResearchPerTurn;
    } else {
      amtToBuildOrResearch[buildingOrResearchName] = amts[buildingOrResearchName];
    }

    buildingsOrResearchPerTurn = buildingsOrResearchPerTurn - amtToBuildOrResearch[buildingOrResearchName];
    amts[buildingOrResearchName] = amts[buildingOrResearchName] - amtToBuildOrResearch[buildingOrResearchName];

    const allBuildingsOrResearch = country.allBuildings;
    if(isResearch){
      allBuildingsOrResearch = country.allResearch;  
    }

    allBuildingsOrResearch[buildingOrResearchName].amt =
      allBuildingsOrResearch[buildingOrResearchName].amt + amtToBuildOrResearch[buildingOrResearchName];
    // buildingsBuilt[buildingName] = buildingsBuilt[buildingName] + buildingToBuild.amtToBuildFarm;
    return buildingsOrResearchPerTurn;

  },
  sell: async (amts, countryID, prices, createMarket) => {

    let allTurns = [];
    let turnsToUse = 2;
    let continueUsingTurns = true;

    let country = Country.sessions[countryID];

    while(turnsToUse != 0 && continueUsingTurns){
      let turnUsed = Country.useTurn(countryID);
      if(turnUsed != null){
        
        allTurns.push(turnUsed); 
      }else{
        continueUsingTurns = false;
      }

      turnsToUse --;
    } 
    
    const amtToSell = {
      troops: 0,
      tanks: 0,
      jets: 0,
      turrets: 0
    }

    if(turnsToUse == 0){
      Country.sellGoodsOrTech(amts, amtToSell, 'military', 'troops', countryID);
      
      const createMarketRes = await createMarket(userID, amtToSell.troops, amtToSell.jets, amtToSell.tanks, amtToSell.turrets) 
      if(!createMarketRes.error){
        country.allMilitary.troops.amt = country.allMilitary.troops.amt - amtToSell.troops;
        country.allMilitary.tanks.amt = country.allMilitary.tanks.amt - amtToSell.tanks;   
        country.allMilitary.jets.amt = country.allMilitary.jets.amt - amtToSell.jets;
        country.allMilitary.turrets.amt = country.allMilitary.turrets.amt - amtToSell.turrets;
      }else{
        for(amtName in amtToSell){
          amtToSell[amtName] = 0;
          
          
        }
      }
    }

    

    return {
      amtToSell,
      allTurns
    }
  },
  sellGoodsOrTech: (amts, amtToSell, goodsOrTechType, goodsOrTechName, countryID) => {
    const country = Country.sessions[countryID];
    
    let maxAmt = 0;
    if(goodsOrTechType == 'military'){
      
      maxAmt = country.allMilitary[goodsOrTechName].amt;
    }else if(goodsOrTechType == 'tech'){
      
      maxAmt = country.allResearch[goodsOrTechName].amt;
    }else{
      
      maxAmt = country[goodsOrTechName];
    }


     
    if(amts[goodsOrTechName] <= maxAmt){
      amtToSell[goodsOrTechName] = amts[goodsOrTechName];
    }else{
      amtToSell[goodsOrTechName] = maxAmt 
    }

    
  },
  buy: (amts, prices, countryID) => {
    // const country = Country.sessions[countryID];
    // const goodsAvail = Market.goodsAvail;
    const goodsBought = {
      troops: 0,
      tanks: 0,
      jets: 0
    }

    Country.buyGoodsOrTech(amts, prices, goodsBought, 'troops', 'military', countryID);
    Country.buyGoodsOrTech(amts, prices, goodsBought, 'tanks', 'military', countryID)
    // let maxAmt = amts.troops;
    // if(prices.troops == goodsAvail.troops.price){
    //   if(goodsAvail.troops.amt < amts.troops){
    //     maxAmt = goodsAvail.troops.amt;
    //   }
    //   if(country.cash < maxAmt * prices.troops){
    //     maxAmt = Math.floor(country.cash / prices.troops)
    //   }

    //   country.cash = country.cash - maxAmt * prices.troops
    //   country.allMilitary.troops.amt = country.allMilitary.troops.amt + maxAmt;
    //   goodsBought.troops = maxAmt
    // }
    

  },
  buyGoodsOrTech: (amts, prices, goodsBought, GTName, GTType, countryID) => {

    const goodsAvail = Market.goodsAvail;
    const country = Countries.sessions[countryID];
    

    if(prices[GTName] == goodsAvail[GTName].price){

      let maxAmt = amts[GTName];
      if(goodsAvail[GTName].amt < maxAmt){
        maxAmt = goodsAvail[GTName].amt;
      }
      if(country.cash < maxAmt * prices[GTName]){
        maxAmt = Math.floor(country.cash / prices[GTName])
      }

      country.cash = country.cash - maxAmt * prices[GTName];
      if(GTType == 'military'){
        country.allMilitary[GTName].amt = country.allMilitary[GTName].amt + maxAmt;
      }else if(GTType == 'tech'){
        country.allResearch[GTName].amt = country.allResearch[GTName].amt + maxAmt;  
      }else{
        country[GTName] = country[GTName] + maxAmt;  
      }

      goodsAvail[GTName].amt = goodsAvail[GTName].amt - maxAmt;
      if(goodsAvail[GTName].amt == 0){
        Market.replenishItem(GTName);  
      }
      goodsBought[GTName] = maxAmt;
    }
  },
  initiateSession: (
    userID, 
    countryID, 
    land, 
    networth, 
    cash, 
    turns,
    population,
    allBuildings, 
    allResearch, 
    allMilitary
  ) => {
    Country.sessions[countryID] = {
      userID: userID,
      countryID: countryID,
      land: land,
      networth: networth,
      cash: cash,
      turns: turns,
      population: population,
      allBuildings: allBuildings,
      allMilitary: allMilitary,
      allResearch: allResearch
    }
    
  },
}



module.exports = Country;

