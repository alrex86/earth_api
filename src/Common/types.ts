export type buildingsType = {
    name: string,
    amt: number,
    
}


export type researchType = {
    name: string,
    amt: number,
    
}

export type militaryType = {
    name: string,
    amt: number,
    
}


export type allBuildingsType = {
    farm: buildingsType,
    researchLab: buildingsType,
    business: buildingsType,
    residential: buildingsType,
    constructionSite: buildingsType
}

export type allResearchType = {
    military: researchType,
    
    business: researchType,
    industrial: researchType,
    
}

export type allMilitaryType = {
    troops: militaryType,
    
    tanks: militaryType,
    jets: militaryType,
    turrets: militaryType,
    spies: militaryType,
}

export type countryType = {
    land: number,
    networth: number,
    population: number,
    allBuildings: allBuildingsType,
    allResearch: allResearchType,
    allMilitary: allMilitaryType,
    cash: number,
    name: string,
    exploredLand: number,
    exploreRate: number,
    
}

export type responseType = {
    status: number, 
    code: number, 
    message: string, 
    payload: any
  
}

