import db from "../config/db";

import { countryDBType } from "../common/types";

import { buildingsType, allBuildingsType, countryType } from "../common/types";

type buildingsBuiltType = {
  farm: number;
  business: number;
  research: number;
};

type techsResearchedType = {
  farm: number;
  business: number;
};

type turnsUsedType = {
  riceProduced: number;
  riceConsumed: number;
  income: number;
  expense: number;
};

type buildResultType = {
  allBuildingsBuilt: buildingsBuiltType[];
  allTurns: turnsUsedType[];
};

type researchResultType = {
  allTechsResearched: techsResearchedType[];
  allTurns: turnsUsedType[];
};

type exploreResultType = {
  allExplores: number[];
  allTurns: turnsUsedType[];
};

type countriesType = {
  [id: number]: countryType;
};

const countriesData = {
  countries: {} as countriesType,
};

const Countries = {
  dbName: "countries",
  countriesData: countriesData,
  createCountry: (newCountry: countryDBType): Promise<number> => {
    // console.log('connection: ', db.connection);
    // let query = "INSERT INTO users set ?", newUser, (err, res) => {}
    return new Promise((resolve, reject) => {
      db.dbData.connection.query(
        "INSERT INTO " + Countries.dbName + " set ?",
        newCountry,
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            resolve(0);
            // result(err, null);
          } else {
            // console.log("user res: ", res);
            // resolve(res.insertId);
          }
        }
      );
    });
  },
  getCountryByUserID: (userID: number): Promise<countryDBType> => {
    // console.log('connection: ', db.connection);
    // let query = "INSERT INTO users set ?", newUser, (err, res) => {}
    return new Promise((resolve, reject) => {
      db.dbData.connection.query(
        "SELECT * FROM " + Countries.dbName + " WHERE userid = ?",
        [userID],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            resolve(null);
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
  getCountryByID: (countryID: number): Promise<countryDBType> => {
    // console.log('connection: ', db.connection);
    // let query = "INSERT INTO users set ?", newUser, (err, res) => {}
    return new Promise((resolve, reject) => {
      db.dbData.connection.query(
        "SELECT * FROM " + Countries.dbName + " WHERE id = ?",
        [countryID],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            resolve(null);
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
  getBuildingsPerTurn: (countryID: number) => {
    let country = Countries.countriesData.countries[countryID];

    return 4 + Math.floor(country.allBuildings.constructionSite.amt / 4);
  },
  getTechPerTurn: (countryID: number) => {
    let country = Countries.countriesData.countries[countryID];

    return 4 + Math.floor(country.allBuildings.constructionSite.amt / 4);
  },
  computeExploreRate: (countryID: number): number => {
    let country = Countries.countriesData.countries[countryID];
    let exploreRate = 50;
    if (country.exploredLand > 2000) {
      let landDiff = country.exploredLand - 2000;
      exploreRate = exploreRate - Math.floor(landDiff / 100);
      if (exploreRate < 10) {
        exploreRate = 10;
      }
    }

    return exploreRate;
  },
  computeAttackPower: (countryID: number): number => {
    let country = Countries.countriesData.countries[countryID];
    let exploreRate = 50;
    if (country.exploredLand > 2000) {
      let landDiff = country.exploredLand - 2000;
      exploreRate = exploreRate - Math.floor(landDiff / 100);
      if (exploreRate < 10) {
        exploreRate = 10;
      }
    }

    return exploreRate;
  },
  initiateCountrySession: async (userID: number): Promise<number> => {
    let countryID = 0;
    let country: countryDBType = await Countries.getCountryByUserID(userID);

    if (country != null) {
      if (Countries.countriesData.countries[country.id] == null) {
        Countries.setCountrySession(country.id, country);
        // Countries.countriesData.countries[country.id] = {
        //     land: country.land,
        //     networth: country.networth,
        //     allBuildings: JSON.parse(country.allbuildings),
        //     population: 0,
        //     cash: 0,
        //     name: ''
        // }
      }

      countryID = country.id;
    }

    return countryID;
  },
  setCountrySession: (countryID: number, country: countryDBType) => {
    Countries.countriesData.countries[countryID] = {
      land: country.land,
      networth: country.networth,
      allBuildings: JSON.parse(country.allbuildings),
      allResearch: JSON.parse(country.allresearch),
      allMilitary: JSON.parse(country.allmilitary),
      population: 0,
      cash: 0,
      name: "",
      exploredLand: 0,
      exploreRate: 50,
    };
  },
  useTurn: (countryID: number): turnsUsedType => {
    let turnUsed: turnsUsedType = {
      riceConsumed: 0,
      riceProduced: 0,
      income: 0,
      expense: 0,
    };

    let country = Countries.countriesData.countries[countryID];
    turnUsed.riceProduced = country.allBuildings.farm.amt * 50;
    turnUsed.riceConsumed = country.population * 50;
    let netRice = turnUsed.riceProduced - turnUsed.riceConsumed;

    return turnUsed;
  },
  build: (
    amtFarm: number,
    amtBusiness: number,
    amtResearch: number,
    countryID: number
  ): buildResultType => {
    let result: buildResultType = {
      allBuildingsBuilt: [],
      allTurns: [],
    };
    let buildingsPerTurn = Countries.getBuildingsPerTurn(countryID);
    let country = Countries.countriesData.countries[countryID];

    let amtToBuildFarm = 0;
    let amtToBuildBusiness = 0;

    while (amtFarm != 0 || amtBusiness != 0) {
      let turnUsed = Countries.useTurn(countryID);
      let buildingsBuilt: buildingsBuiltType = {
        farm: 0,
        business: 0,
        research: 0,
      };

      amtToBuildFarm = 0;
      amtToBuildBusiness = 0;
      if (amtFarm > buildingsPerTurn) {
        amtToBuildFarm = buildingsPerTurn;
      } else {
        amtToBuildFarm = amtFarm;
      }

      buildingsPerTurn = buildingsPerTurn - amtToBuildFarm;
      amtFarm = amtFarm - amtToBuildFarm;

      if (amtBusiness > buildingsPerTurn) {
        amtToBuildBusiness = buildingsPerTurn;
      } else {
        amtToBuildBusiness = amtBusiness;
      }

      buildingsPerTurn = buildingsPerTurn - amtToBuildBusiness;
      amtBusiness = amtBusiness - amtToBuildBusiness;

      country.allBuildings.farm.amt =
        country.allBuildings.farm.amt + amtToBuildFarm;
      buildingsBuilt.farm = buildingsBuilt.farm + amtToBuildFarm;
      country.allBuildings.business.amt =
        country.allBuildings.business.amt + amtToBuildBusiness;
      buildingsBuilt.business = buildingsBuilt.business + amtToBuildBusiness;
      country.allBuildings.researchLab.amt =
        country.allBuildings.researchLab.amt + amtResearch;

      result.allBuildingsBuilt.push(buildingsBuilt);
      result.allTurns.push(turnUsed);
    }

    return result;
  },

  research: (
    amtFarm: number,
    amtBusiness: number,
    countryID: number
  ): researchResultType => {
    let result: researchResultType = {
      allTechsResearched: [],
      allTurns: [],
    };
    let techPerTurn = Countries.getTechPerTurn(countryID);
    let country = Countries.countriesData.countries[countryID];

    let amtToResearchFarm = 0;
    let amtToResearchBusiness = 0;

    while (amtFarm != 0 || amtBusiness != 0) {
      let turnUsed = Countries.useTurn(countryID);
      let techsResearched: techsResearchedType = {
        farm: 0,
        business: 0,
      };

      amtToResearchFarm = 0;
      amtToResearchBusiness = 0;
      if (amtFarm > techPerTurn) {
        amtToResearchFarm = techPerTurn;
      } else {
        amtToResearchFarm = amtFarm;
      }

      techPerTurn = techPerTurn - amtToResearchFarm;
      amtFarm = amtFarm - amtToResearchFarm;

      if (amtBusiness > techPerTurn) {
        amtToResearchBusiness = techPerTurn;
      } else {
        amtToResearchBusiness = amtBusiness;
      }

      techPerTurn = techPerTurn - amtToResearchBusiness;
      amtBusiness = amtBusiness - amtToResearchBusiness;

      country.allBuildings.farm.amt =
        country.allBuildings.farm.amt + amtToResearchFarm;
      techsResearched.farm = techsResearched.farm + amtToResearchFarm;
      country.allBuildings.business.amt =
        country.allBuildings.business.amt + amtToResearchBusiness;
      techsResearched.business =
        techsResearched.business + amtToResearchBusiness;
      // country.allBuildings.researchLab.amt = country.allBuildings.researchLab.amt + amtResearch;

      result.allTechsResearched.push(techsResearched);
      result.allTurns.push(turnUsed);
    }

    return result;
  },
  explore: (turns: number, countryID: number): exploreResultType => {
    let result: exploreResultType = {
      allExplores: [],
      allTurns: [],
    };

    let country = Countries.countriesData.countries[countryID];
    let exploreRate = country.exploreRate;
    let landExplored = 0;

    while (turns > 0) {
      let turnUsed = Countries.useTurn(countryID);
      landExplored = exploreRate;

      result.allExplores.push(landExplored);
      result.allTurns.push(turnUsed);
      turns--;
    }

    country.exploreRate = Countries.computeExploreRate(countryID);
    console.log("result: ", result);
    return result;
  },
  // attack: async (troops: number, countryIDEnemy: number, countryID: number): Promise<exploreResultType> => {

  //     let result: exploreResultType = {
  //         allExplores: [],
  //         allTurns: []
  //     }

  //     let country = Countries.countriesData.countries[countryID];
  //     let countryEnemy = null;

  //     if(Countries.countriesData.countries[countryIDEnemy] == null){
  //         let countryEnemyDB = await Countries.getCountryByID(countryIDEnemy);
  //         Countries.setCountrySession(countryIDEnemy, countryEnemyDB);

  //     }

  //     countryEnemy = Countries.countriesData.countries[countryID];

  //     let exploreRate = country.exploreRate;
  //     let landExplored = 0;

  //     while(turns > 0){
  //         let turnUsed = Countries.useTurn(countryID)
  //         landExplored = exploreRate;

  //         result.allExplores.push(landExplored);
  //         result.allTurns.push(turnUsed);
  //         turns --;
  //     }

  //     country.exploreRate = Countries.computeExploreRate(countryID);
  //     console.log('result: ', result);
  //     return result;

  // }
};

export default Countries;
