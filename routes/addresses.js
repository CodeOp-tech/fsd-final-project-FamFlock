var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET all addresses */
router.get("/", async function (req, res, next) {
  let results = await db(`SELECT * FROM tripAddresses`);
  res.send(results.data);
});

/* GET address by id */
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let results = await db(
      `SELECT * from tripAddresses WHERE FK_trips_id= ${id}`
    );
    let addressess = results.data;

    if (addressess.length === 0) {
      res.status(404).send({ error: "we cannot find what you requested" });
    } else {
      res.send(addressess);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* POST to tripsAddresses */
router.post("/", async function (req, res, next) {
  const { latLng, name, formatted_address, FK_trips_id } = req.body;
  const sql = `INSERT INTO tripAddresses (FK_trips_id, latLng, name, formatted_address) VALUES ('${FK_trips_id}','${latLng}','${name}', '${formatted_address}' )`;

  try {
    await db(sql);
    let results = await db("SELECT * FROM tripAddresses");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* DELETE to tripsAddresses */
router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  const sql = `DELETE FROM tripAddresses WHERE id=${Number(id)}`;

  try {
    await db(sql);
    let results = await db("SELECT * FROM tripAddresses");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
