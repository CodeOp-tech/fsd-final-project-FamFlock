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

// /* Join to Json */
function joinToJson2(results) {
  // Create array of  objs

  let row0 = results.data[0];

  let trips = results.data.map((row) => ({
    trip_id: row.trip_id,
    startDate: row.startDate,
    endDate: row.endDate,
    destination: row.destination,
    group_id: row.group_id,
  }));

  return trips;
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

    if (results.data.length === 0) {
      res.status(404).send({ error: "we cannot find what you requested" });
    } else {
      let trip = joinToJson(results);
      res.send(trip);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* POST to trips */
router.post("/", async function (req, res, next) {
  const { startDate, endDate, destination, name, user_id } = req.body;
  const sql1 = `INSERT INTO tripGroups (name) VALUES ('${name}'); SELECT LAST_INSERT_ID();`;

  try {
    let result1 = await db(sql1);
    let FK_tripGroups_id = result1.data[0].insertId;
    console.log(FK_tripGroups_id);

    const sql2 = `INSERT INTO trips (FK_tripGroups_id, startDate, endDate, destination) VALUES (${FK_tripGroups_id},'${startDate}','${endDate}','${destination}');`;
    let result2 = await db(sql2);

    const sql3 = `INSERT INTO users_tripGroups(FK_users_id,FK_tripGroups_id) VALUES (${user_id},${FK_tripGroups_id})`;
    let result3 = await db(sql3);

    let sql4 = `SELECT DISTINCT trips.*, trips.id AS trip_id, tripGroups.id as group_id
    FROM users_tripGroups 
    INNER JOIN tripGroups ON tripGroups.id = users_tripGroups.FK_tripGroups_id
    INNER JOIN trips ON trips.FK_tripGroups_id = tripGroups.id  
    WHERE users_tripGroups.FK_users_id = ${user_id}`;

    let results = await db(sql4);

    let trips = await joinToJson2(results);

    res.send(trips);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
