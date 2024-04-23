const Country = require("./../models/countries");
const {
  ALL_BUILDINGS,
  ALL_MILITARY,
  ALL_RESEARCH,
} = require("./../common/enums/country");

const createCountry = async (req, res) => {
  const { name, userId } = req.body;
  if (!name || !userId)
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
    cash: 0,
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
    cash: 0,
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

module.exports = {
  createCountry,
};
