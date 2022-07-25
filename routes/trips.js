var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET trips */
router.get("/", async function (req, res, next) {
  let results = await db("SELECT * FROM trips");
  res.send(results.data);
});

/* GET user by id */
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

module.exports = router;
