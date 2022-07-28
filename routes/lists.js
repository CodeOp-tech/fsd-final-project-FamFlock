var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET lists */
router.get("/", async function (req, res, next) {
  let results = await db("SELECT * FROM lists");
  res.send(results.data);
});

/* GET list by id */
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  try {
    let results = await db(`SELECT * FROM lists WHERE id = ${id}`);
    let list = results.data;
    if (list.length === 0) {
      res.status(404).send({ error: "we cannot find what you requested" });
    } else {
      res.send(list[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* POST to lists */
router.post("/", async function (req, res, next) {
  const {
    destin,
    decideDates,
    bookFlight,
    bookAccom,
    essent,
    planAct,
    decideTrans,
    splitPlan,
    reservations,
  } = req.body;
  const sql = `INSERT INTO lists (destin, decideDates, bookFlight, bookAccom, essent, planAct, decideTrans, splitPlan, reservations) VALUES ('${destin}','${decideDates}','${bookFlight}','${bookAccom}','${essent}','${planAct}','${decideTrans}','${splitPlan}','${reservations}' )`;

  try {
    await db(sql);
    let results = await db("SELECT * FROM lists");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
