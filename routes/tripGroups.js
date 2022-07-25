var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET trip groups */
router.get("/", async function (req, res, next) {
  let results = await db("SELECT * FROM `tripGroups`");
  res.send(results.data);
});

/* GET trip user by id */
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let results = await db(`SELECT * FROM tripGroups WHERE id = ${id}`);
    let tripGroup = results.data;
    if (tripGroup.length === 0) {
      res.status(404).send({ error: "we cannot find what you requested" });
    } else {
      res.send(tripGroup[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
