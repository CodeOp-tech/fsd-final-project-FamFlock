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
    let results = await db(`SELECT * FROM itinerary WHERE id = ${id}`);
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

module.exports = router;
