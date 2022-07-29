var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// join to JSON helper function
function joinToJson(results) {
  // Get first row
  let row0 = results.data[0];

  // // Create array of itinerary objs
  let itinerary = [];
  if (row0.id) {
    itinerary = results.data.map((i) => ({
      activityid: i.id,
      activity: i.activity,
      date: i.date,
      location: i.location,
      time: i.time,
      FK_trips_id: i.FK_trips_id,
    }));
  }

  // Create trip obj
  let trip = {
    id: row0.tripid,
    FK_tripGroups_id: row0.FK_tripGroups_id,
    startDate: row0.startDate,
    endDate: row0.endDate,
    destination: row0.destination,
    itinerary,
  };

  return trip;
}

/* GET trips */
router.get("/", async function (req, res, next) {
  let results = await db("SELECT * FROM trips");
  res.send(results.data);
});

/* GET trip by id */
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let results =
      await db(`SELECT trips.id AS tripid, itinerary.id AS activityid, trips.*, itinerary.* FROM trips
      LEFT JOIN itinerary ON itinerary.FK_trips_id = trips.id
     WHERE trips.id = ${id}`);
    // let trip = results.data;
    let trip = await results;
    trip = joinToJson(trip);
    if (trip.length === 0) {
      res.status(404).send({ error: "we cannot find what you requested" });
    } else {
      res.send(trip);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* POST to trips */
router.post("/", async function (req, res, next) {
  const { startDate, endDate, destination } = req.body;
  const sql = `INSERT INTO trips (FK_tripGroups_id, startDate, endDate, destination) VALUES (1,'${startDate}','${endDate}','${destination}' )`;

  try {
    await db(sql);
    let results = await db("SELECT * FROM trips");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
