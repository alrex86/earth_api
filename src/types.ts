import mysql from 'mysql';

export type dbType = {
    connection: mysql.Connection,
    
}

export type newUserType = {
    username: string,
    bidbal: number,
    password: string
}

export type userSessionsType = {
    id: number,
    username: string,
    password: string,
    token: string,
    countryID: number
}



// export type userSessions = {
//     [id: number]: userSessionsType
// }

export type userSessions = {
    [id: number]: userSessionsType
}

// export type usersType = {
//     userSessions: userSessionsType[],
    
    
// }

export type userDBType = {
    username: string,
    password: string,
    id: number
}

export type userTokenDataType = {
    userID: number, 
    siteID: number, 
    authority: number, 
    token: string, 
    tokenID: number, 
    username: string, 
    country: number, 
    admin: number
    
}

// export type responseType = {
//     status: number, 
//     code: number, 
//     message: string, 
//     payload: any
    
// }

export type countryDBType = {
    userid: number,
    allbuildings: string,
    allresearch: string,
    allmilitary: string,
    land: number,
    networth: number,
    id: number,
    name: string,
    cash: number
}

// export type buildingsType = {
//     name: string,
//     amt: number,
    
// }

// export type allBuildingsType = {
//     farm: buildingsType,
//     researchLab: buildingsType,
//     business: buildingsType,
//     residential: buildingsType,
//     constructionSite: buildingsType
// }

// export type countryType = {
//     land: number,
//     networth: number,
//     population: number,
//     allBuildings: allBuildingsType
// }



