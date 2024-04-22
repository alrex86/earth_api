const Country = require("./../models/countries");

const createCountry = async (req, res) => {
  const { name, userId } = req.body;
  if (!name || !userId)
    return res.status(400).json({
      error: true,
      message: "Invalid request. Please supply missing id and name.",
    });

  // check if user has an existing country
  const [rows] = await Country.getCountryByUserId(userId);
  console.log(rows.length);
  if (rows.length > 0)
    return res.status(400).json({
      error: true,
      message: "Unable to create country. User has an existing one.",
    });

  const allBuildings = {
    researchLab: {
      name: "Research Lab",
      amt: 0,
    },
    residential: {
      name: "Residential",
      amt: 0,
    },
    farm: {
      name: "Farm",
      amt: 0,
    },
    constructionSite: {
      name: "Construction Site",
      amt: 0,
    },
    business: {
      name: "Business",
      amt: 0,
    },
  };

  const allResearch = {
    military: {
      name: "Military",
      amt: 0,
    },
    business: {
      name: "Business",
      amt: 0,
    },
    industrial: {
      name: "Industrial",
      amt: 0,
    },
  };

  const allMilitary = {
    troops: {
      name: "Troops",
      amt: 0,
    },
    tanks: {
      name: "Tanks",
      amt: 0,
    },
    jets: {
      name: "Jets",
      amt: 0,
    },
    turrets: {
      name: "Turrets",
      amt: 0,
    },
    spies: {
      name: "Spies",
      amt: 0,
    },
  };

  const country = {
    allBuildings: allBuildings,
    allResearch: allResearch,
    allMilitary: allMilitary,
    land: 0,
    networth: 0,
    population: 0,
    cash: 0,
    name: name,
    exploredLand: 0,
    exploreRate: 50,
  };

  const payload = {
    userid: userId,
    allbuildings: allBuildings,
    allresearch: allResearch,
    allmilitary: allMilitary,
    land: country.land,
    networth: country.networth,
    cash: 0,
    name: name,
  };

  // TODO: complete create countries
  res.json(payload);
};

module.exports = {
  createCountry,
};
