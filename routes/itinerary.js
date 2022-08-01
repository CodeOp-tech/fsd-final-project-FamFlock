var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET itinerary */
router.get("/", async function (req, res, next) {
  let results = await db("SELECT * FROM itinerary");
  res.send(results.data);
});

/* GET itinerary by id */
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let results =
      await db(`SELECT itinerary.id AS activityid, trips.id AS tripid, itinerary.*, trips.* FROM itinerary 
    LEFT JOIN trips ON trips.id = itinerary.FK_trips_id 
    WHERE itinerary.id = ${id}`);
    let itinerary = results.data;
    if (itinerary.length === 0) {
      res.status(404).send({ error: "we cannot find what you requested" });
    } else {
      res.send(itinerary[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* POST to itinerary */
router.post("/", async function (req, res, next) {
  const { activity, date, location, time } = req.body;
  const sql = `INSERT INTO itinerary (activity, date, location, time, FK_trips_id) VALUES ('${activity}','${date}','${location}',${time}, 1 )`;

  try {
    await db(sql);
    let results = await db("SELECT * FROM itinerary");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
