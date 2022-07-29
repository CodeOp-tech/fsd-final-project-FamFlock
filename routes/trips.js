var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET trips */
router.get("/", async function (req, res, next) {
  let results = await db("SELECT * FROM trips");
  res.send(results.data);
});

/* GET trip by id */
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let results = await db(`SELECT * FROM trips WHERE id = ${id}`);
    let trip = results.data;
    if (trip.length === 0) {
      res.status(404).send({ error: "we cannot find what you requested" });
    } else {
      res.send(trip[0]);
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
