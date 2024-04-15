import express from 'express';

import Miscs from '../../models/Miscs';
import Countries from '../../models/Countries';
import Users from '../../models/Users';

import { countryDBType } from '../../types';
import { buildingsType, researchType, militaryType, allBuildingsType, allResearchType, allMilitaryType, countryType } from '../../Common/types';

const router = express.Router();

router.post('/createCountry', async (req, res) => {
    console.log("\nCREATE COUNTRY\n");
    console.log('req.body: ', req.body);
    let response = Miscs.createResponse();
    
    let countryExist: countryDBType = await Countries.getCountryByUserID(req.body.userID);
    if(countryExist == null){
        let farm: buildingsType = {
            name: 'Farm',
            amt: 0
        }
    
        let business: buildingsType = {
            name: 'Business',
            amt: 0
        }
    
        let constructionSite: buildingsType = {
            name: 'Construction Site',
            amt: 0
        }
    
        let residential: buildingsType = {
            name: 'Residential',
            amt: 0
        }
    
        let researchLab: buildingsType = {
            name: 'Research Lab',
            amt: 0
        }

        let military: researchType = {
            name: 'Military',
            amt: 0
        }

        let businessRes: researchType = {
            name: 'Business',
            amt: 0
        }

        let industrial: researchType = {
            name: 'Industrial',
            amt: 0
        }

        let troops: militaryType = {
            name: 'Industrial',
            amt: 0
        }

        let jets: militaryType = {
            name: 'Industrial',
            amt: 0
        }

        let tanks: militaryType = {
            name: 'Industrial',
            amt: 0
        }

        let turrets: militaryType = {
            name: 'Industrial',
            amt: 0
        }

        let spies: militaryType = {
            name: 'Industrial',
            amt: 0
        }
    
        let allBuildings: allBuildingsType = {
            researchLab: researchLab,
            residential: residential,
            farm: farm,
            constructionSite: constructionSite,
            business: business
        }

        let allResearch: allResearchType = {
            military: military,
            business: businessRes,
            industrial: industrial
        }

        let allMilitary: allMilitaryType = {
            troops: troops,
            tanks: tanks,
            jets: jets,
            turrets: turrets,
            spies: spies
        }
    
        let country: countryType = {
            allBuildings: allBuildings,
            allResearch: allResearch,
            allMilitary: allMilitary,
            land: 0,
            networth: 0,
            population: 0,
            cash: 0,
            name: '',
            exploredLand: 0,
            exploreRate: 50
        }
    
        

        
    
        let allBuildingsStr = JSON.stringify(country.allBuildings);
        let allResearchStr = JSON.stringify(country.allResearch);
        let allMilitaryStr = JSON.stringify(country.allMilitary);
    
        let newCountry: countryDBType = {
            userid: req.body.userID,
            allbuildings: allBuildingsStr,
            allresearch: allResearchStr,
            allmilitary: allMilitaryStr,
            land: country.land,
            networth: country.networth,
            cash: 0,
            name: '',
            id: 0
        }
        
        let countryID = await Countries.createCountry(newCountry);
        Countries.setCountrySession(countryID, newCountry);
        response.message = 'Country created successfully.'
        response.payload = newCountry;
        res.send(response);
       
    }
    
    // console.log('users: ', Users.usersData);
    
    
    
});

router.post('/build', async (req, res) => {
    console.log("\nBUILD\n");
    console.log('req.body: ', req.body);
    
    let response = Miscs.createResponse();  
    let user = Users.usersData.userSessions[req.body.userID];
         
    response.payload = Countries.build(parseInt(req.body.farm), parseInt(req.body.business), parseInt(req.body.research), user.countryID);
    console.log('result: ', response.payload);
    res.send(response);
});

router.post('/research', async (req, res) => {
    console.log("\nRESEARCH\n");
    console.log('req.body: ', req.body);
    
    let response = Miscs.createResponse();  
    let user = Users.usersData.userSessions[req.body.userID];
         
    response.payload = Countries.research(parseInt(req.body.farm), parseInt(req.body.business), user.countryID);
    console.log('result: ', response.payload);
    res.send(response);
});

router.post('/explore', async (req, res) => {
    console.log("\nEXPLORE\n");
    console.log('req.body: ', req.body);
    
    let response = Miscs.createResponse();  
    let user = Users.usersData.userSessions[req.body.userID];
         
    response.payload = Countries.explore(parseInt(req.body.turns), user.countryID);
    console.log('result: ', response.payload);
    res.send(response);
});

const Game = {router}

export default Game;